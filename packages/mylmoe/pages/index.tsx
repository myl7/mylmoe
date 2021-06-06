import Comment from '../components/comment'
import Head from '../components/head'

const Index = () => {
  return (
    <>
      <Head
        title={'Index & Post List'}
        description={'All blog posts & some probably useful utilities made by myl7'}
        path={'/'}
      />
      <Comment />
    </>
  )
}

export default Index
