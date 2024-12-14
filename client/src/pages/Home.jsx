import { Hero, Emergency } from '../components'

const Home = () => {
  if(window.localStorage.getItem('email') && window.localStorage.getItem('phone')){
    window.location.href='/dashboard'
  }
  return (
    <div>
      <Hero />
    </div>
  )   
}

export default Home
