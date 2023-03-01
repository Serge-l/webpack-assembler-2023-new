import { Post } from "./Post"
import './styles/styles.css'
import './styles/less.less'
import './styles/scss.scss'
import image from './images/Screenshot_1.png'

const post = new Post('Webpack Post Title')

console.log('Post to String:', post.toString())