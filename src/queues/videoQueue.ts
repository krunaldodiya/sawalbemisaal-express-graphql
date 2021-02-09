import Queue from 'bull'
import { pubsub } from '../context'
import { config } from '../libs/config'

export const videoQueue = new Queue('Video Transcode', config('redis'))

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
