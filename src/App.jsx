import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { X } from "react-bootstrap-icons";
import { Plus } from "react-bootstrap-icons";
import { Whatsapp } from "react-bootstrap-icons";

function App() {
  const telephone = useRef()
  const kasusref = useRef()
  const [isshowform, setisshowform] = useState(false)
  const [massagedata, setmassagedata] = useState([{
    number: 83845923336,
    massage: `perbaikan telah selesai segera di ambil`,
    kasus: "perbaikan laptop",
    status: "done",
    image: ""
  },
  {
    number: 89650120007,
    massage: `ada masalah segera datang ke toko`,
    kasus: "perbaikan printer",
    status: "problem",
    image: ""
  },
  {
    number: 82336537481,
    massage: `ada masalah segera datang ke toko`,
    kasus: "perbaikan printer",
    status: "problem",
    image: ""
  },
  ])
  useEffect(() => {
    fetch("http://localhost:5000")
      .then(response => response.json()).then(res => setmassagedata(res.data))
  }, [])
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
    <main className="flex relative w-screen h-max flex-col mt-2 items-center gap-y-3 justify-between flex-wrap " >
      {massagedata && massagedata.map((e, i) =>
        <div key={e.number} className={`border-4 relative ${statuscolor(e.status)} px-2 py-1 gap-y-2 flex flex-col justify-between w-[80vw] h-max rounded-3xl shadow-[7px_7px_2px_black]`} >
          <h1 className="text-2xl font-bold" >{e.kasus}</h1>
          <h1 className="text-md font-medium text-center -mb-2 flex-grow w-max  inline-block " >merubah status</h1>
          <div className="flex w-24 h-max">
            <button className={`${e.status === "pending" ? "bg-yellow-500 " : "border-yellow-500"} border-2 duration-200 w-24 px-2 py-1 text-xl border-yellow-500`} onClick={() => changestatus(i, "pending")} > pending </button>
            <button className={`${e.status === "problem" ? "bg-red-500 " : "border-red-500"} duration-200 w-24 px-2 py-1 text-xl border-2 border-red-500`} onClick={() => changestatus(i, "problem")} >problem</button>
            <button className={`${e.status === "done" ? "bg-green-500 " : "border-green-500"} duration-200 w-24 px-2 py-1 text-xl border-2 `} onClick={() => changestatus(i, "done")} > done </button>
          </div>
          <button className={`w-max h-max self-center flex items-center gap-2 justify-between bg-green-500 px-2 py-1 border-4 rounded-full font-bold `} onClick={() => sendtext(e.number, e.status, e.kasus)}> <Whatsapp />
            <span className="-mt-1 font-medium text-xl tracking-wider" > send massage </span>
          </button>
        </div>)}
      {isshowform && 
      <form action="" className="bg-white px-2 py-3 shadow-[4px_4px_10px_black] top-[190px] left-[79px] w-[55vw] h-max flex flex-col absolute" onSubmit={(e) => {
        e.preventDefault();
        setmassagedata((prevData) => [
          ...prevData,
          {
            number: telephone.current.value,
            massage: "perbaikan sedang dikerjakan",
            kasus: kasusref.current.value,
            status: "pending",
            image: "",
          },
        ]);
      }} >
       <button onClick={() => setisshowform(false)} className="absolute right-2 top-1 p-1 rounded-full border-2 border-red-600" > <X className=" text-xl" /> </button>
        <h1 className="text-2xl font-bold tracking-wide mt-2" > tambah kasus </h1>
        <label htmlFor="nama-kasus" className="flex flex-col"  >
          kasus
          <input className="outline-none border-2  border-black px-2" type="text" ref={kasusref} name="kasus" id="nama-kasus" />
        </label>
        <label htmlFor="phone-number" className="flex flex-col">
          no telpon
          <input className="outline-none border-2 border-black px-2" type="number" ref={telephone} name="kasus" id="phone=number" />
        </label>
        <button type="submit" className=" justify-self-end border mt-3 bg-blue-400/40 border-black shadow-[2px_2px_0_black]" >tambah</button>
      </form>}
      <footer className="border-t-2 border-black w-screen bg-red-500 fixed bottom-0 px-2 py-1 h-max" >
        <button className=" inline-block rounded-full p-2 border-2 border-black" onClick={() => setisshowform(!isshowform)}>  <Plus className="text-xl" />  </button>
      </footer>
    </main>
  )
}

export default App
