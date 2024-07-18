import Content from '../components/Content'
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Home(){
  return (<div className="flex flex-col gap-10  ">
        <Header />
        <Content />
  </div>)
}