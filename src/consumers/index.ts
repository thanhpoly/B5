import { kafkaClient } from "../configs/kafka.config";
import { IConsumer } from "../interfaces/IConsumer.interface";
import { SyncStockPriceBasicConsumer } from "./sync-stock-price-basic.consumer";
import { RetryStockPriceConsumer } from "./retry-stock-price.consumer";

async function initConsumer(consumerInfo: IConsumer) {
  const consumer = kafkaClient.consumer({ groupId: consumerInfo.groupId });
  await consumer.connect();

  await consumer.subscribe({
    topic: consumerInfo.topicSubscribe,
    fromBeginning: consumerInfo.fromBeginning,
  });

  await consumer.run({
    eachMessage: consumerInfo.processor,
    autoCommit: true,
    autoCommitThreshold: 100,
    autoCommitInterval: 5000,
  });
}

async function main() {
  // await initConsumer(SyncStockPriceConsumer)
  // await initConsumer(SyncStockPriceBasicConsumer);
  await initConsumer(RetryStockPriceConsumer);
}

main();
