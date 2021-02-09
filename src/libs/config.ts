import path from 'path'

export const config = (key: string) => {
  const data: any = {
    views: path.join(__dirname, '/../views'),
    public: path.join(__dirname, '/../public'),
    redis: {
      redis: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
      },
    },
  }

  return data[key]
}
