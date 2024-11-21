import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import "./TransactionsList.css"
const port = sessionStorage.getItem('port')

const TransactionsList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rewardAddress, setRewardAddress] = useState('');
    const [feeAddress, setFeeAddress] = useState('');

    const handleMine = async () => {
        try {
            const response = await axios.post(`http://localhost:${port}/miner/mine`, {rewardAddress: sessionStorage.getItem("publicKey"), feeAddress: sessionStorage.getItem("publicKey") });
            console.log('Mining successful:', response.data);
            toast.success("Mining success")
            window.location.reload()
        } catch (error) {
            console.error('Error mining transaction:', error);
            toast.error("Mining fail")
        }
    };


    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // const response = await axios.get('/blockchain/transactions');
                const response = await axios.get(`http://localhost:${port}/blockchain/transactions`);
                setTransactions(response.data);
            } catch (err) {
                setError('Failed to fetch transactions');
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Toaster position="top-center"/>
            <h1>Transactions Pools</h1>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Reward Address"
                    value={rewardAddress}
                    onChange={(e) => setRewardAddress(e.target.value)}
                    style={{ marginRight: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
                <input
                    type="text"
                    placeholder="Fee Address"
                    value={feeAddress}
                    onChange={(e) => setFeeAddress(e.target.value)}
                    style={{ marginRight: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
                <button
                    onClick={handleMine}
                    style={{
                        padding: '15px 25px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        color: 'black',
                        cursor: 'pointer'
                    }}
                >
                    Mine All
                </button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Transaction ID</th>
                    <th>Hash</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.hash}</td>
                        <td>{transaction.type}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );



};

export default TransactionsList;
