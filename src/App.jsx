import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [massagedata, setmassagedata] = useState([{
    number: 83845923336,
    massage: `perbaikan telah selesai segera di ambil`,
    kasus: "perbaikan laptop",
    status: "done",
    image:""
  },
  {
    number: 89650120007,
    massage: `ada masalah segera datang ke toko`,
    kasus: "perbaikan printer",
    status: "problem",
    image:""
  },
  {
    number: 82336537481,
    massage: `ada masalah segera datang ke toko`,
    kasus: "perbaikan printer",
    status: "problem",
    image:""
  },
  ])
  useEffect(() => {
    fetch("http://localhost:5000")
      .then(response => response.json()).then(res => setmassagedata(res.data))
  }, [])
  const [statusShow, setstatusShow] = useState(false)
  async function sendtext(number, status, kasus) {
    let massage = ""
    if (status === "problem") {
      massage = `ada masalah segera kembali ke toko 
      kasus: ${kasus}`
    }
    else if (status === "pending") {
      massage = `projek sedang dikerjakan 
      kasus: ${kasus}`
    }
    else {
      massage = `projek sudah selesai 
      kasus: ${kasus}`
    }
    const encodedMessage = encodeURIComponent(massage);
    const whatsappUrl = `https://wa.me/+62${number}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    return massage
  }
  const changestatus = (target, change) => setmassagedata(item => item.map((e, idx) => idx === target ? { ...e, status: change } : e))
  const statuscolor = (status) => {
    if (status === "problem") {
      return "border-red-500"
    }
    else if (status === "pending") {
      return "border-yellow-500"
    }
    else {
      return "border-green-500"
    }

  }
  return (
    <main className="flex w-screen h-max flex-col mt-2 items-center gap-y-3 justify-between flex-wrap " >
      {massagedata && massagedata.map((e, i) =>
        <div key={e.number} className={`border-4 relative ${statuscolor(e.status)} px-2 py-1 flex flex-col justify-between w-80 h-32 rounded-3xl shadow-[7px_7px_2px_black]`} >
          <h1>{e.kasus}</h1>
          <div onClick={() => setstatusShow(!statusShow)} className="absolute right-2 top-3 border-2 border-red-500 w-6 h-6"></div>
          {statusShow &&
            <div className="flex w-24 h-max">
              <button className="p-2 text-xl border-2 border-yellow-500" onClick={() => changestatus(i, "pending")} ></button>
              <button className="p-2 text-xl border-2 border-red-500" onClick={() => changestatus(i, "problem")} ></button>
              <button className="p-2 text-xl border-2 border-green-500" onClick={() => changestatus(i, "done")} ></button>
            </div>}
          <button className="w-max h-max inline-block px-2 py-1 border-black border-2 rounded-full  font-bold" onClick={() => sendtext(e.number, e.status, e.kasus)} >send massage</button>
        </div>)}
    </main>
  )
}

export default App
