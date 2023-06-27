import React from "react";
import '../resources/analytics.css';
import { Progress } from "antd";

function Analytics({ transactions }) {

    const totalTransactions = transactions.length
    const totalIncomeTransactions = transactions.filter(transaction => transaction.type === 'income')
    const totalExpenseTransactions = transactions.filter(transaction => transaction.type === 'expense')
    const totalIncomeTransactionsPercentage = (totalIncomeTransactions.length / totalTransactions) * 100
    const totalExpenseTransactionsPercentage = (totalExpenseTransactions.length / totalTransactions) * 100

    const totalTurnover = transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnover = transactions.filter(transaction => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalExpenseTurnover = transactions.filter(transaction => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnoverPercentage = (totalIncomeTurnover / totalTurnover) * 100
    const totalExpenseTurnoverPercentage = (totalExpenseTurnover / totalTurnover) * 100

    const categories = [
        'salary',
        'business income',
        'miscellaneous income',
        'bills and payments',
        'shopping',
        'investment',
        'miscellaneous expense',
    ];


    return (
        <div className="analytics">
            <div className="row">
                <div className="col mt-3">
                    <div className="transactions-count-1">
                        <h4>Total transactions : {totalTransactions}</h4>
                        <hr />
                        <h5>&emsp; &emsp; &emsp;
                            Income : {totalIncomeTransactions.length}
                            &emsp; &emsp; &emsp;
                            Expense : {totalExpenseTransactions.length}
                        </h5>

                        <div className="progress-bars">
                            <Progress
                                className="mx-5"
                                strokeColor='#30cfd0'
                                type="circle"
                                percent={totalIncomeTransactionsPercentage.toFixed(0)}
                            />
                            <Progress
                                strokeColor= "#330867"
                                type="circle"
                                percent={totalExpenseTransactionsPercentage.toFixed(0)}
                            />
                        </div>
                    </div>
                </div>

                <div className="col mt-3">
                    <div className="transactions-count-2">
                        <h4>Total Turnover : {totalTurnover}</h4>
                        <hr />
                        <h5> &emsp;
                            Income : {totalIncomeTurnover}
                            &emsp;
                            Expense : {totalExpenseTurnover}
                        </h5>

                        <div className="progress-bars">
                            <Progress
                                className="mx-5"
                                strokeColor='#30cfd0'
                                type="circle"
                                percent={totalIncomeTurnoverPercentage.toFixed(0)}
                            />
                            <Progress
                                strokeColor='#330867'
                                type="circle"
                                percent={totalExpenseTurnoverPercentage.toFixed(0)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="row mt-2">
                <div className="col">
                    <div className="category-analysis-1">
                        <h4>Income - Category Wise</h4>
                        {categories.map((category) => {
                            const amount = transactions
                                .filter((t) => t.type === 'income' && t.category === category)
                                .reduce((acc, t) => acc + t.amount, 0);
                            return (
                                amount > 0 && <div className="category-card">
                                    <h5>{category}</h5>
                                    <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="col">
                    <div className="category-analysis-2">
                        <h4>Expense - Category Wise</h4>
                        {categories.map((category) => {
                            const amount = transactions
                                .filter((t) => t.type === 'expense' && t.category === category)
                                .reduce((acc, t) => acc + t.amount, 0);
                            return (
                                amount > 0 && <div className="category-card">
                                    <h5>{category}</h5>
                                    <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics;