import path from 'path'

export const config = (key: string) => {
  const data: any = {
    views: path.join(__dirname, '/../views'),
    public: path.join(__dirname, '/../public'),
  }

  return data[key]
}
