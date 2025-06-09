// import { useState, useCallback, useEffect, useRef } from 'react'

// function App() {
//   const [length, setLength] = useState(0);
//   const [numberAllowed,setNumberAllowed]=useState(false);
//   const [charAllowed,setCharAllowed]=useState(false);
//   const [password,setPassword]=useState("");

//   //useRef hook
//   const passwordRef = useRef(null);

//   const passwordGenerator = useCallback(() => {
//     let pass=""
//     let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

//     if(numberAllowed){
//       str+="0123456789"
//     }

//     if(charAllowed){
//       str+="!@#$%^&*-_+=[]{}~`"
//     }

//     for(let i=1;i<=length;i++){
//       let char=Math.floor(Math.random()*str.length+1)
//       pass+=str.charAt(char);
//     }

//     setPassword(pass);

//   },[length,numberAllowed,charAllowed,setPassword])

//   const copyPasswordToClipboard = useCallback(() =>{
//     passwordRef.current?.select();
//     passwordRef.current?.setSelectionRange(0,101);
//     window.navigator.clipboard.writeText(password)
//   },[password])

//   useEffect(()=>{
//     passwordGenerator()
//   },[length,numberAllowed,charAllowed,passwordGenerator])

//   return (
//     <>
//       <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-white bg-gray-800'>
//         <h1 className='text-white text-center my-3'>Password Generator</h1>
//         <div className='flex shadow rounded-lg overflow-hidden mb-4'>
//           <input type='text'
//           value={password}
//           className='outline-none w-full py-1 px-3 bg-white text-black'
//           placeholder='Password'
//           readOnly
//           ref={passwordRef}
//           />
//           <button 
//           onClick={copyPasswordToClipboard}
//            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer'>copy</button>
//         </div>
//         <div className='flex text-sm gap-x-2'>
//           <div className='flex items-center gap-x-1'>
//             <input
//             type='range'
//             min={6}
//             max={100}
//             value={length}
//             className='cursor-pointer'
//             onChange={(e) => {setLength(e.target.value)}}
//             />
//             <label>Length: {length}</label>
//           </div>
//           <div className='flex items-center gap-x-1'>
//             <input className='cursor-pointer'
//             type='checkbox'
//             defaultChecked={numberAllowed}
//             id='numberInput'
//             onChange={()=>{
//               setNumberAllowed((prev) => !prev);
//             }}
//             />
//             <label htmlFor='numberInput'>Numbers</label>
//           </div>
//           <div className='flex items-center gap-x-1'>
//             <input className='cursor-pointer'
//             type='checkbox'
//             defaultChecked={charAllowed}
//             id='characterInput'
//             onChange={()=>{
//               setCharAllowed((prev) => !prev);
//             }}/>
//             <label htmlFor='characterInput'>Characters</label>
//           </div>
//         </div>
//       </div>

//     </>
//   )
// }

// export default App




import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4'>
      <div className='w-full max-w-md bg-gray-900 shadow-2xl rounded-2xl p-6'>
        <h1 className='text-3xl font-bold text-center text-white mb-6'>🔐 Password Generator</h1>
        
        <div className='flex mb-4 shadow-inner rounded-lg overflow-hidden'>
          <input
            type='text'
            value={password}
            ref={passwordRef}
            readOnly
            className='w-full px-4 py-2 text-lg bg-white text-gray-800 focus:outline-none'
          />
          <button
            onClick={copyPasswordToClipboard}
            className='bg-blue-600 hover:bg-blue-700 transition-colors px-4 text-white font-semibold cursor-pointer'
          >
            Copy
          </button>
        </div>

        <div className='space-y-4 text-sm text-white'>
          <div className='flex items-center justify-between'>
            <label htmlFor='length'>Password Length:</label>
            <span className='font-medium'>{length}</span>
          </div>
          <input
            id='length'
            type='range'
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className='w-full accent-blue-500 cursor-pointer'
          />

          <div className='flex items-center justify-between'>
            <label htmlFor='numberInput'>Include Numbers</label>
            <input
              id='numberInput'
              type='checkbox'
              checked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
              className='accent-blue-500 cursor-pointer'
            />
          </div>

          <div className='flex items-center justify-between'>
            <label htmlFor='characterInput'>Include Special Characters</label>
            <input
              id='characterInput'
              type='checkbox'
              checked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
              className='accent-blue-500 cursor-pointer'
            />
          </div>
        </div>

        <div className='mt-6 text-center'>
          <button
            onClick={passwordGenerator}
            className='w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer'
          >
            Generate New Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
