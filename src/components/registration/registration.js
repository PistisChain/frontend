import React, { useState } from "react";
import pbkdf2 from "pbkdf2";
import { eddsa as EdDSA } from "elliptic";

function Registration() {
  const [studentID, setStudentID] = useState("");
  const [password, setpassword] = useState("");
  const [pk, setPk] = useState("");
  const [sk, setSk] = useState("");

  const ec = new EdDSA("ed25519");
  const SALT =
    "0ffaa74d206930aaece253f090c88dbe6685b9e66ec49ad988d84fd7dff230d1";

  function generateSecret(password) {
    return pbkdf2
      .pbkdf2Sync(password, SALT, 10000, 64, "sha512")
      .toString("hex");
  }

  function generateKeyPairFromSecret(secret) {
    const keyPair = ec.keyFromSecret(secret);
    return {
      publicKey: keyPair.getPublic("hex"),
      privateKey: keyPair.getSecret("hex"),
    };
  }

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!studentID || !password) {
      alert("studentID和password不能为空");
      return;
    }
    try {
      const secret = generateSecret(password);
      const keyPair = generateKeyPairFromSecret(secret);
      setPk(keyPair.publicKey);
      setSk(keyPair.privateKey);
    } catch (error) {
      console.error("注册失败", error);
    }
};
return (
  <div className="registration">
    <h2 className="registration-title">Student Registration</h2>
    <form className="registration-form">
      <div className="input-group">
        <label>Student ID:</label>
        <input
          type="text"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>PK:</label>
        <input type="text" value={pk} readOnly />
      </div>
      <div className="input-group">
        <label>SK:</label>
        <input type="text" value={sk} readOnly />
      </div>
      <button className="button" onClick={handleGenerate}>
        generate
      </button>
    </form>
  </div>
);


  };

  


export default Registration;
