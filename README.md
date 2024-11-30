<p align="center">
  <img width="144" alt="screenshot 2024-11-01 152350" src="https://github.com/user-attachments/assets/a9eb6c84-d094-4a3c-8bde-e33085da169f">
</p>

<h1 align="center">PistisChain</h1>

## Project Overview
This project implements a blockchain-based student attendance system. It records attendance data through competitive mining among student nodes, using dynamic difficulty adjustment and fork resolution mechanisms to ensure chain consistency and fairness. The attendance records are stored directly on the blockchain. Nodes synchronize data through HTTP-simulated P2P communication.
<p><a href="https://github.com/pistischain/backend">Backend Project Repository</a></p>

## Technology Stack

### Frontend
- **Framework**: React
- **Component Library**: Ant Design
- **Communication Protocol**: HTTP Requests

### Backend
- **Framework**: Express
- **Storage**: JSON files for blockchain data
- **Communication Protocol**: HTTP (using `superagent` library)

### Node Communication
- **Method**: HTTP-based P2P communication simulation
- **Library**: `superagent` for inter-node HTTP requests

## System Design
### 1. System Startup
```
npm start
```

### 2. Blockchain Structure

#### Block Structure
Each block contains:
- **Index**: Block sequence number
- **Previous Hash**: Points to previous block
- **Current Hash**: Current block's hash value
- **Timestamp**: Block generation time
- **Nonce**: For proof of work
- **Difficulty**: Dynamic mining difficulty
- **Transactions**: Array of transactions

#### Transaction Types
1. **Regular Transaction**
2. **Reward Transaction**: Mining rewards
3. **Fee Transaction**: Transaction fees
4. **Attendance Transaction**: Student attendance records
5. **Register Transaction**: Registration records

Example Block JSON structure:
```json
{
        "index": 1,
        "nonce": 11,
        "previousHash": "2e2bb570cc7d1220ae9caf03d4c351877e49e33629eb51deea26a5f740dfae9e",
        "timestamp": 1732977586.455,
        "transactions": [
            {
                "id": "1fa9a0ffde870ed9fc9a08e1940d640e2ff473b9bb5f6b56e000aabfcbc4cd0d",
                "hash": "0401c47cacad646ed87d2f40fe085411ea828286037f666c003e8b4a51fbb135",
                "type": "register",
                "studentId": "ccc",
                "eventId": null,
                "timestamp": 1732977581123,
                "passwordHash": "64daa44ad493ff28a96effab6e77f1732a3d97d83241581b37dbd70a7a4900fe",
                "attendanceSignature": null,
                "data": {
                    "inputs": [],
                    "outputs": [
                        {
                            "amount": 0,
                            "address": "a52234c6c815aead50132549ab4d15701073bdd29ae005a0997d3eaa0931d48b"
                        },
                        {
                            "amount": 0,
                            "address": null
                        }
                    ]
                }
            },
            {
                "id": "b647e588b312006c293d8e9ddd3801c28468f035a6e4d669ad7a7dcee3c11a65",
                "hash": "6b6e3cdfd8c8f7206a468e59566a78b2c1b4733d4cf2b0f117a0c21d8943a8ed",
                "type": "fee",
                "data": {
                    "inputs": [],
                    "outputs": [
                        {
                            "amount": 0,
                            "address": null
                        }
                    ]
                }
            }
        ],
        "hash": "106a9617cc1baddf02a2a8cbe2b5db9fd2727bd84666e698ee6f72c205a34d36"
    }
```