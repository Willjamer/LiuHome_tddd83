"use client";

import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [payer, setPayer] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('Ready for payment');
  const [identifier, setIdentifier] = useState('');
  const [originalPaymentReference, setOriginalPaymentReference] = useState('');

  const clear = () => {
    setIdentifier('');
    setOriginalPaymentReference('');
  };

  const updateStatus = (msg: string) => {
      setStatus(`Status: ${msg}`);
  };

  const handleStartPayment = async () => {
    if (!payer || !payer.startsWith('46')) {
      updateStatus(!payer ? 'Payer is required' : 'Payer should start with 46');
      return;
    }
    if (!amount) {
      updateStatus('Amount is required');
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/paymentrequests", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payerAlias: payer, amount, message })
      });

      if (res.status !== 201) {
        updateStatus(`Request failure: ${res.statusText}`);
        return;
      }

      const json = await res.json();
      setIdentifier(json.id);
      updateStatus(`Payment request created with identifier ${json.id}, open app.`);
    } catch (error) {
      console.error('Request failure:', error);
    }
  };

  const getPaymentStatus = async () => {
    const id = identifier;
    if (!id) {
      updateStatus('No payment Id');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/payment-status/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await res.json();
      if (json.status === 'PAID') {
        setOriginalPaymentReference(json.paymentReference);
      }
      updateStatus(`Payment(identifier: ${id}, paymentReference: ${originalPaymentReference}) ${json.status}`);
    } catch (error) {
      console.error('Request failure:', error);
    }
  };

  return (
    <div>
      <Head>
        <title>Swish Merchant Demo</title>
      </Head>

      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%', padding: '10px', height: '300px' }}>
          <h2>E-com</h2>
          <form>
            Payer:<br />
            <input type="text" value={payer} onChange={(e) => setPayer(e.target.value)} /><br />
            Amount:<br />
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} /><br />
            Message:<br />
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} /><br /><br />
          </form>
          <h3>{status}</h3>
          <button onClick={handleStartPayment}>Start Payment</button>
          <button onClick={() => { getPaymentStatus(); }}>Check Payment status</button><br /><br />
        </div>
      </div>
    </div>
  );
}
