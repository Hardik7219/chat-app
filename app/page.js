import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    < >
      <h1 className="font-mono text-lg p-2 text-center bg-indigo-500 text-black font-bold">Hello this is a simple chating app</h1>
      <div className="flex gap-6 flex-col justify-center p-2 mt-20 ml-1">
        <div>
          <p>Aleredy have a account?</p>
          <Link href="/pages/login" className="bg-green-400 p-2 px-6 mt-2 rounded">login</Link>
        </div>
        <div>
          <p>Create a account</p>
          <Link href="/pages/signup" className="bg-green-400 p-2 mt-3 px-6 rounded">sign-up</Link>
        </div>
      </div>
      <div className="h-100 mt-20 ">
        <div className="card">
          <div className="header">
            <div className="top">
              <div className="circle">
                <span className="red circle2"></span>
              </div>
              <div className="circle">
                <span className="yellow circle2"></span>
              </div>
              <div className="circle">
                <span className="green circle2"></span>
              </div>
              <div className="title">
                <p id="title2">About</p>
              </div>
            </div>
          </div>
          <div className="code-container">
            <textarea className="area" id="code" name="code" readOnly="" defaultValue="he">
            </textarea>
          </div>
        </div>
      </div>
    </>
  );
}
