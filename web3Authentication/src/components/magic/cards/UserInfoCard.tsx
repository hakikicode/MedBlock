import { useCallback, useEffect, useMemo, useState } from 'react';
import Divider from '@/components/ui/Divider';
import { LoginProps } from '@/utils/types';
import { logout } from '@/utils/common';
import { useMagic } from '@/hooks/MagicProvider';
import useWeb3 from '@/hooks/Web3';
import Card from '@/components/ui/Card';
import CardHeader from '@/components/ui/CardHeader';
import CardLabel from '@/components/ui/CardLabel';
import Spinner from '@/components/ui/Spinner';
import { getNetworkName, getNetworkToken } from '@/utils/network';


const UserInfo = ({ token, setToken }: LoginProps) => {
  const { magic } = useMagic();
  const web3 = useWeb3();

  const [balance, setBalance] = useState('...');
  const [copied, setCopied] = useState('Copy');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [publicAddress] = useState(localStorage.getItem('user'));

  const getBalance = useCallback(async () => {
    if (publicAddress && web3) {
      const balance = await web3.eth.getBalance(publicAddress);
      if (balance == BigInt(0)) {
        setBalance('0');
      } else {
        setBalance(web3.utils.fromWei(balance, 'ether'));
      }
      console.log('BALANCE: ', balance);
    }
  }, [web3, publicAddress]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await getBalance();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  }, [getBalance]);

  useEffect(() => {
    if (web3) {
      refresh();
    }
  }, [web3, refresh]);

  useEffect(() => {
    setBalance('...');
  }, [magic]);

  const disconnect = useCallback(async () => {
    if (magic) {
      await logout(setToken, magic);
    }
  }, [magic, setToken]);

  const copy = useCallback(() => {
    if (publicAddress && copied === 'Copy') {
      setCopied('Copied!');
      navigator.clipboard.writeText(publicAddress);

      console.log("Public Address : ", publicAddress);


      setTimeout(() => {
        setCopied('Copy');
      }, 1000);
    }
  }, [copied, publicAddress]);


  const [formData, setFormData] = useState<Patient>({
    name: "",
    DOB: "",
    ImageUrl: "",
    email: "",
    publicAddress: "",
    contact: "",
    gender: "",
    adhar: "",
  });



  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, DOB, ImageUrl, email, contact, gender, adhar } = formData;

    try {
      console.log("Public Addewss : ", publicAddress);
      const response = await axios.post("http://localhost:8000/createRecord", {
        _publicAddress: publicAddress,
        _name: name,
        _DOB: DOB,
        _url: ImageUrl,

        _control: "controlCode", // Dummy control code for now
        _gender: gender,
        _aadhar: adhar,
        _patientId: "patient123", // Dummy ID for now
      });

      console.log("Create Record Response:", response.data);





      // Clear form
      setFormData({
        name: "",
        DOB: "",
        ImageUrl: "",
        email: "",
        publicAddress: "",
        contact: "",
        gender: "",
        adhar: "",
      });
    } catch (error) {
      console.error("Error creating patient record:", error);
    }
  };


  return (
    <Card>
      <CardHeader id="Wallet">All your Health at one Place!</CardHeader>

      <div className="flex-row">
        <div className="green-dot" />
        <div className="connected">Successfull Verified Email! </div>
      </div>
      <Divider />

      <div className="login-container">
        <h2>Patient Sign-Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="date"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            placeholder="Date of Birth"
            required
          />
          <input
            type="text"
            name="ImageUrl"
            value={formData.ImageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            required
          />


          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact Number"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="text"
            name="adhar"
            value={formData.adhar}
            onChange={handleChange}
            placeholder="Aadhar"
            required
          />

        </form>
      </div>


      <CardLabel leftHeader="" rightAction={!publicAddress ? <Spinner /> : <div onClick={copy}><br></br>  <button type="submit" className="signup-btn">
        Sign Up
      </button></div>} />







    </Card>
  );
};

export default UserInfo;



import axios from "axios";


interface Patient {
  name: string;
  DOB: string;
  ImageUrl: string;

  publicAddress: string;
  contact: string;
  gender: string;
  adhar: string;
}

