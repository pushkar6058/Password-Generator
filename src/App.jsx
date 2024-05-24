import { useEffect, useState,useRef } from "react"
import { useCallback } from "react";


function App() {
  const [length,getLength]=useState(8);
  const [usenum,setuseNum]=useState(false);
  const [usechar,setuseChar]=useState(false);
  const [password,setPassword]=useState("");

  const passwordRef = useRef(null)

  const passwordGenerator= useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(usenum) str+= "0123456789"
    if(usechar) str+= "!@#$%^&*()_-+={[}]~|<>?:;."


    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length +1) 
      pass +=str.charAt(char);

    }
    setPassword(pass)


  },[length,usenum,usechar,setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])


useEffect(()=>{
  passwordGenerator()
},[length,usenum,usechar,passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8
      text-orange-500 bg-gray-700">
        <h1 className="text-center text-white my-3">Password Generator</h1>
        <div className="flex shadow rounded-md overflow-hidden mb-4">
          <input 
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
           />
           <button 
           
           onClick={copyPasswordToClipboard}
           className="bg-blue-400 outline-none hover:bg-blue-600 text-white px-3py-0.5 shrink-0">Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1 ">
            <input type="range" 
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e)=>{getLength(e.target.value)}} />
            <label> Length : {length}</label>
          </div>


          <div className="flex items-center gap-x-1">
            <input type="checkbox" 
            defaultChecked={usenum}
            id="numberInput"
            onChange={()=>{
              setuseNum((prev)=>!prev);
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" 
            defaultChecked={usechar}
            id="charInput"
            onChange={()=>{
              setuseChar((prev)=>!prev); 
            }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
