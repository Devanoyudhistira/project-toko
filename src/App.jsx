import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [massagedata, setmassagedata] = useState()
  useEffect(() => {
    fetch("http://localhost:5000")
    .then(response => response.json()).then(res => setmassagedata(res.data))
  },[])
  async function sendtext(number, status,kasus) {
    let massage = ""
    if(status === "problem"){
      massage = `ada masalah segera kembali ke toko 
      kasus: ${kasus}`
    }
    else if(status === "pending"){
      massage = `projek sedang dikerjakan kasus: ${kasus}`
    }
    else{
      massage = `projek sudah selesai 
      kasus: ${kasus}`
    }
    const encodedMessage = encodeURIComponent(massage);
    const whatsappUrl = `https://wa.me/+62${number}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  }
  return (
    <div className="flex w-screen h-36 gap-y-3 justify-evenly flex-wrap" >

      {massagedata && massagedata.map((e, i) =>
        <div key={e.number} className={`border-2 ${e.status === "problem" && "border-red-500"} ${e.status === "pending" && "border-yellow-500"}
        ${e.status === "done" && "border-green-500"} w-44 h-24 bg-slate-50`} >
          <h1>{e.kasus}</h1>
          <button onClick={() => sendtext(e.number, e.status,e.kasus)} >send massage</button>
          <div className="flex w-24 h-max">
            <button className="p-2 text-xl border-2 border-yellow-500" onClick={() => setmassagedata(item => item.map((e, idx) => idx === i ? { ...e, status: "pending" } : e))} ></button>
            <button className="p-2 text-xl border-2 border-red-500" onClick={() => setmassagedata(item => item.map((e, idx) => idx === i ? { ...e, status: "problem" } : e))} ></button>
            <button className="p-2 text-xl border-2 border-green-500"
              onClick={() => setmassagedata(item => item.map((e, idx) => idx === i ? { ...e, status: "done" } : e))} ></button>

          </div>
        </div>)}
    </div>
  )
}

export default App
