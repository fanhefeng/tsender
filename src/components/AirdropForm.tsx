"use client";

import InputField from "./ui/InputField";
import { useState, useMemo } from "react";
import { chainsToTSender, erc20Abi, tsenderAbi } from "@/constants";
import { useAccount, useChainId, useConfig, useWriteContract } from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { calculateTotal } from "@/utils";

// AirdropForm 是一个用于空投代币的表单组件
export default function AirdropForm() {
	// tokenAddress 是代币合约地址的状态变量，使用`0x${string}`类型以确保格式正确
	const [tokenAddress, setTokenAddress] = useState<`0x${string}`>("" as `0x${string}`);
	// recipients 是接收者地址列表的状态变量
	const [recipients, setRecipients] = useState("");
	// amounts 是每个接收者地址对应的金额列表的状态变量
	const [amounts, setAmounts] = useState("");
	// chainId 是当前区块链网络的ID
	const chainId = useChainId();
	// config 是 wagmi 库的配置对象，用于与智能合约交互
	const config = useConfig();
	// account 是当前连接的钱包账户信息
	const account = useAccount();
	// totalAmount 是所有金额的总和
	const totalAmount: number = useMemo(() => calculateTotal(amounts), [amounts]);
	const { writeContractAsync, isPending, data: hash } = useWriteContract();

	// getApprovedAmount 获取批准的数量
	async function getApprovedAmount(tsenderAddress: string | null): Promise<number> {
		if (!tsenderAddress) {
			alert("No address found, please use a support chain.");
			return 0;
		}
		return (await readContract(config, {
			address: tokenAddress,
			abi: erc20Abi,
			functionName: "allowance",
			args: [account.address, tsenderAddress],
		})) as number;
	}

	// handleSubmit 处理表单提交事件
	const handleSubmit = async () => {
		console.log("Send tokens");
		const tSenderAddress = chainsToTSender[chainId]["tsender"];
		console.log("tSenderAddress =>", tSenderAddress);
		console.log("chainId =>", chainId);
		console.log("config =>", config); // 打印配置信息到控制台
		console.log("account =>", account);
		const approvedAmount = await getApprovedAmount(tSenderAddress);
		console.log("approvedAmount =>", approvedAmount);
		const sendAirDrop = async () => {
			console.log("Send airdrop");
			const sendAirdropRes = await writeContractAsync({
				address: tSenderAddress,
				abi: tsenderAbi,
				functionName: "airdropERC20",
				args: [
					tokenAddress,
					recipients
						.split(/[\n,]+/)
						.map((address) => address.trim())
						.filter((address) => address !== ""),
					amounts
						.split(/[\n,]+/)
						.map((amount) => amount.trim())
						.filter((amount) => amount !== ""),
					BigInt(totalAmount),
				],
			});
			console.log("sendAirdropRes =>", sendAirdropRes);
		};
		if (approvedAmount < totalAmount) {
			const approvalHash = await writeContractAsync({
				address: tokenAddress,
				abi: erc20Abi,
				functionName: "approve",
				args: [tSenderAddress, BigInt(totalAmount)],
			});
			const approvalReceipt = await waitForTransactionReceipt(config, { hash: approvalHash });
			console.log("approvalReceipt =>", approvalReceipt);
			await sendAirDrop();
		} else {
			await sendAirDrop();
		}
	};
	return (
		<>
			<div className="mt-8 w-full p-6 bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-300 dark:border-gray-700">
				<h2 className="text-center text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Airdrop Form</h2>
				<InputField
					label="Token Address"
					placeholder="0x..."
					value={tokenAddress}
					onChange={(e) => setTokenAddress(e.target.value as `0x${string}`)}
				/>
				<InputField
					label="Recipients"
					placeholder="0x123, 0x456, 0x789"
					value={recipients}
					onChange={(e) => setRecipients(e.target.value)}
					large={true}
				/>
				<InputField label="Amounts" placeholder="100, 200, 300" value={amounts} onChange={(e) => setAmounts(e.target.value)} large={true} />
				<button
					onClick={handleSubmit}
					className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 dark:bg-indigo-500 dark:hover:bg-indigo-600"
				>
					Send Tokens
				</button>
			</div>
		</>
	);
}
