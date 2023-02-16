import moment from "moment";
import { codesePool, query } from "../configs/database.config";
import { KAFKA_TOPIC } from "../constants/kafka.constant";
import { IConsumer } from "../interfaces/IConsumer.interface";

const processor = async ({ topic, partition, message }) => {
  var retry = 0;
  while (retry >= 0 && retry < 3) {
    console.log(`retry message #${retry}`);
    try {
      const data = JSON.parse(message.value.toString());

      const {
        code,
        exchange,
        tradingDate,
        askPrice1,
        askPrice2,
        askPrice3,
        askVol1,
        askVol2,
        askVol3,
        bidPrice1,
        bidPrice2,
        bidPrice3,
        bidVol1,
        bidVol2,
        bidVol3,
        lastPrice,
        totalVol,
        refPrice,
        unixTime,
      } = data;

      const sql = `insert into StockPrice (code, exchange, tradingDate, askPrice1, askPrice2, askPrice3, askVol1, askVol2, askVol3, bidPrice1, bidPrice2, bidPrice3, bidVol1, bidVol2, bidVol3, lastPrice, totalVol, refPrice, unixTime) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) on duplicate key update exchange=?, tradingDate=?, askPrice1=?, askPrice2=?, askPrice3=?, askVol1=?, askVol2=?, askVol3=?, bidPrice1=?, bidPrice2=?, bidPrice3=?, bidVol1=?, bidVol2=?, bidVol3=?, lastPrice=?, totalVol=?, refPrice=?, unixTime=?`;
      await query(codesePool, sql, [
        code,
        exchange,
        tradingDate,
        askPrice1,
        askPrice2,
        askPrice3,
        askVol1,
        askVol2,
        askVol3,
        bidPrice1,
        bidPrice2,
        bidPrice3,
        bidVol1,
        bidVol2,
        bidVol3,
        lastPrice,
        totalVol,
        refPrice,
        unixTime,
        exchange,
        tradingDate,
        askPrice1,
        askPrice2,
        askPrice3,
        askVol1,
        askVol2,
        askVol3,
        bidPrice1,
        bidPrice2,
        bidPrice3,
        bidVol1,
        bidVol2,
        bidVol3,
        lastPrice,
        totalVol,
        refPrice,
        unixTime,
      ]);

      retry -= 1;
    } catch (error) {
      retry++;
      if (retry >= 3) {
        const sqlLogError = `insert into Log (log) values (?,?)`;
        await query(codesePool, sqlLogError, [
          error.toString(),
          moment().format("YYYY-MM-DDTHH:mm:ss"),
        ]);
      } else {
        console.log(`${retry}`);
      }
    }
  }
};

export const RetryStockPriceConsumer: IConsumer = {
  name: "retry-stock-price",
  fromBeginning: false,
  topicSubscribe: KAFKA_TOPIC.RETRY,
  groupId: "operation-group:retry-stock-price",
  processor,
};
