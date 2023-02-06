import React,{useState,useEffect} from 'react'
import {Card, FormField, Loader} from '../components'


const Home = () => {
  const [loading,setLoading]=useState(false);
  const [allPosts,setAllPosts]=useState(null);
  const [searchedText,setSearchedText]=useState('')
  const [searchedTimeout,setSearchedTimeout]=useState(null)
  const [searchedposts,setSearchedPosts]=useState(null)

  const handleSearchText=e=>{
    clearTimeout(searchedTimeout)
    setSearchedText(e.target.value);
    setSearchedTimeout(setTimeout(()=>{
      setSearchedPosts(allPosts.filter(item=>item.name.toLowerCase().includes(searchedText)||item.prompt.toLowerCase().includes(searchedText)))
    },500))
  }

  useEffect(()=>{
    const fetchPosts=async()=>{
      setLoading(true);
      try{
        const response=await fetch('http://localhost:8080/api/v1/posts',{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          }
        })
        console.log(response.status)
        if(response.ok) {
          const data=await response.json();
          console.log(data);
          setAllPosts(data.data.reverse())
        }
      }catch(err) {
        console.log(err.message);
        alert(err);
      }finally {
        setLoading(false);
      }
    }
    fetchPosts();
  },[])

  const CardList=({data,title})=>{
    if(data?.length>0) {
      return data.map(card=>(
        <Card key={card.id} {...card}/>
      ))
    }
    return <h1 className='mt-5'>{title}</h1>
  }
  return (
    <section className='max-w-7xl mx-auto'>
        <div>
          <h1 className='text-[32px] font-extrabold'>Community ShowCase</h1>
          <p className='text-gray-700 max-w-[500px] mt-2'>Browse through our imaginative images that are pretty super and very lovely to see</p>
        </div>
        <div className='mt-16'>
          <FormField labelName='Search' placeholder='Search' type='text' value={searchedText} handleChange={handleSearchText}/>
        </div>
        <div className='mt-10'>
          {searchedText && (
            <div className='text-gray-700 text-2xl'>
              Searched Results for : <span className='text-black font-bold'>{searchedText}</span>
            </div>
          )}
          {loading ? (
            <div className='flex justify-center items-center'>
              <Loader/>
            </div>
          ):(
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              { searchedText?(
              <CardList data={searchedposts} title={`No results for the search ${searchedText}`}/>
            ):(
              <CardList data={allPosts} title='No Results yet'/>
            )}
            </div>
           
          )}
        </div>
    </section>
  )
}

export default Home