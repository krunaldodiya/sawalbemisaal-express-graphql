import Queue from 'bull'
import { pubsub } from '../context'

export const videoQueue = new Queue('Video Transcode', {
  redis: { port: 6379, host: '127.0.0.1', password: '' },
})

interface VideoTranscodeInput extends Queue.Job {
  data: { language: string }
}

videoQueue.process(async (job: VideoTranscodeInput, done) => {
  const { language } = job.data

  pubsub.publish('QUEUE_ADDED', {
    payload: language,
  })

  done()
})
