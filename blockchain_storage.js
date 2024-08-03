const crypto = require('crypto');
const CryptoJS = require('crypto-js');

class Block {
    constructor(index, transactions, timestamp, previousHash, nonce = 0) {
        this.index = index;
        this.transactions = transactions;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.nonce = nonce;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto.createHash('sha256').update(JSON.stringify(this)).digest('hex');
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Блок добыт: " + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 1;
    }

    createGenesisBlock() {
        return new Block(0, [], Date.now(), "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(this.chain.length, this.pendingTransactions, Date.now(), this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log("Блок успешно добыт!");
        this.chain.push(block);

        this.pendingTransactions = [
            { from: "network", to: miningRewardAddress, amount: this.miningReward }
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalance(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.from === address) {
                    balance -= trans.amount;
                }
                if (trans.to === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

class DataManager {
    static generateKey(secretPhrase) {
        return CryptoJS.PBKDF2(secretPhrase, 'salt', { keySize: 256 / 32, iterations: 1000 }).toString();
    }

    static encryptData(data, secretPhrase) {
        const key = this.generateKey(secretPhrase);
        return CryptoJS.AES.encrypt(data, key).toString();
    }

    static decryptData(encryptedData, secretPhrase) {
        const key = this.generateKey(secretPhrase);
        const bytes = CryptoJS.AES.decrypt(encryptedData, key);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}

class BlockchainDataStorage {
    constructor() {
        this.blockchain = new Blockchain();
    }

    storeData(data, secretPhrase) {
        const encryptedData = DataManager.encryptData(data, secretPhrase);
        const transaction = {
            from: "user",
            to: "blockchain",
            data: encryptedData
        };
        this.blockchain.createTransaction(transaction);
        this.blockchain.minePendingTransactions("miner_address");
    }

    retrieveData(blockIndex, transactionIndex, secretPhrase) {
        try {
            const encryptedData = this.blockchain.chain[blockIndex].transactions[transactionIndex].data;
            return DataManager.decryptData(encryptedData, secretPhrase);
        } catch (e) {
            console.log("Ошибка при получении данных:", e);
            return null;
        }
    }
}

// Пример использования
function main() {
    const blockchainStorage = new BlockchainDataStorage();

    // Пример: Сохранение данных
    const secretPhrase = "my_secret_passphrase";
    const dataToStore = "Это конфиденциальная информация, которую нужно хранить безопасно.";

    console.log("Сохранение данных в блокчейне...");
    blockchainStorage.storeData(dataToStore, secretPhrase);
    console.log("Данные успешно сохранены!");

    // Пример: Извлечение данных
    console.log("\nИзвлечение данных из блокчейна...");
    const retrievedData = blockchainStorage.retrieveData(1, 0, secretPhrase);

    if (retrievedData) {
        console.log("Извлеченные данные:", retrievedData);
    } else {
        console.log("Не удалось извлечь данные. Убедитесь, что вы используете правильную секретную фразу и индексы блока/транзакции.");
    }

    // Проверка валидности блокчейна
    console.log("\nПроверка валидности блокчейна...");
    const isValid = blockchainStorage.blockchain.isChainValid();
    console.log("Блокчейн валиден:", isValid);
}

main();
