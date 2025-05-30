import { set } from "mongoose";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
const Contact  = ({listing})=>{
    console.log(listing);
    const [Landlord,setLandlord] = useState(null);
    const [message,setMessage] = useState("");
    useEffect(()=>{
        const fetchLandlord = async ()=>{
            try {
                const res = await fetch(`/api/v1/user/listing/get/${listing.userRef}`);
                const result = await res.json();
                if(result.success == true)
                {

                    setLandlord(result);
                    console.log(result.data);
                }
                else{
                    alert("error in fetching landlord");
                    console.log("error in fetching landlord");
                }
            } catch (error) {
                alert("error in fetching landlord");
                console.log(error);
            }
        }
        fetchLandlord();
    },[listing.userRef]
    )
    return (
    <>
    {Landlord && (
        <div className="flex flex-col gap-2">
            <p className="font-semibold">
                Contact {Landlord.data.username} for {listing.name.toLowerCase()}
            </p>
            <textarea name="message" id="message"  rows="2" placeholder="Enter your message here..." className="w-full border p-3 rounded-lg" onChange={(e)=>{setMessage(e.target.value)}}></textarea>
            <Link to={`mailto:${Landlord.data.email}?subject=Regarding ${listing.name}&body=${message},`} className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95">Send Message</Link>
        </div>
    )}
    </>
    );
}
export default Contact;