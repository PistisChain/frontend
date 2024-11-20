import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import "./TransactionsList.css"

const TransactionsList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleMine = async (transactionId) => {
        try {
            const response = await axios.post('http://localhost:3001/miner/mine', { transactionId });
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
                const response = await axios.get('http://localhost:3001/blockchain/transactions');
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
            <table>
                <thead>
                <tr>
                    <th>Transaction ID</th>
                    <th>Hash</th>
                    <th>Type</th>
                    <th>Operate</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.hash}</td>
                        <td>{transaction.type}</td>
                        <td>
                            <button onClick={() => handleMine(transaction.id)}>Mine</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );



};

export default TransactionsList;
