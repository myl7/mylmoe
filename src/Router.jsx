import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import PostPage from './pages/PostPage'
import ArcaeaPage from './pages/ArcaeaPage'
import FriendPage from './pages/FriendPage'
import BrotliUtilPage from './pages/BrotliUtilPage'
import NonsencePage from './pages/NonsencePage'
import IdeaAddPage from './pages/admin/IdeaAddPage'

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'} children={<IndexPage />} />
        <Route path={'/posts/:slug'} children={<PostPage />} />
        <Route path={'/pages/arcaea'} children={<ArcaeaPage />} />
        <Route path={'/pages/nonsence'} children={<NonsencePage />} />
        <Route path={'/pages/friends'} children={<FriendPage />} />
        <Route path={'/utils/brotli'} children={<BrotliUtilPage />} />
        <Route path={'/admin/ideas/add'} children={<IdeaAddPage />} />
      </Switch>
    </Router>
  )
}
