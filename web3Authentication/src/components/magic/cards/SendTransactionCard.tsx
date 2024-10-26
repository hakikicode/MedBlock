import React, { useCallback, useEffect, useState } from 'react';
import Divider from '@/components/ui/Divider';
import useWeb3 from '@/hooks/Web3';
import FormButton from '@/components/ui/FormButton';
import FormInput from '@/components/ui/FormInput';
import ErrorText from '@/components/ui/ErrorText';
import Card from '@/components/ui/Card';
import CardHeader from '@/components/ui/CardHeader';
import { getFaucetUrl, getNetworkToken, isEip1559Supported } from '@/utils/network';
import showToast from '@/utils/showToast';
import Spacer from '@/components/ui/Spacer';
import TransactionHistory from '@/components/ui/TransactionHistory';
import Image from 'next/image';
import Link from 'public/link.svg';
import { TxnParams } from '@/utils/types';

const SendTransaction = () => {
  const web3 = useWeb3();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [disabled, setDisabled] = useState(!toAddress || !amount);
  const [hash, setHash] = useState('');
  const [toAddressError, setToAddressError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const publicAddress = localStorage.getItem('user');

  useEffect(() => {
    setDisabled(!toAddress || !amount);
    setAmountError(false);
    setToAddressError(false);
  }, [amount, toAddress]);

  const sendTransaction = useCallback(async () => {
    if (!web3?.utils.isAddress(toAddress)) {
      return setToAddressError(true);
    }
    if (isNaN(Number(amount))) {
      return setAmountError(true);
    }
    setDisabled(true);

    const txnParams: TxnParams = {
      from: publicAddress,
      to: toAddress,
      value: web3.utils.toWei(amount, 'ether'),
    };

    if (isEip1559Supported()) {
      const feeData = await web3.eth.calculateFeeData();
      txnParams.maxFeePerGas = BigInt(feeData.maxFeePerGas);
      txnParams.maxPriorityFeePerGas = BigInt(feeData.maxPriorityFeePerGas);
    } else {
      txnParams.gasPrice = await web3.eth.getGasPrice();
    }

    web3.eth
      .sendTransaction(txnParams as any)
      .on('transactionHash', (txHash) => {
        setHash(txHash);
        console.log('Transaction hash:', txHash);
      })
      .then((receipt) => {
        showToast({
          message: 'Transaction Successful',
          type: 'success',
        });
        setToAddress('');
        setAmount('');
        console.log('Transaction receipt:', receipt);
      })
      .catch((error) => {
        console.error('Transaction error:', error);
        setDisabled(false);
        showToast({
          message: 'Transaction Failed: ' + error.message,
          type: 'error',
        });
      });

  }, [web3, amount, publicAddress, toAddress]);

  return (




    <>
    </>
  );
};

export default SendTransaction;
