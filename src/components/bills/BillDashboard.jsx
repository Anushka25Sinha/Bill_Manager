import { BadgeDollarSign, PlusCircle, TrendingUp, Wallet } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTotalAmount } from '../../features/bills/selectors';
import Modal from '../common/Modal';
import BillChart from './BillChart';
import BillFilters from './BillFilters';
import BillForm from './BillForm';
import BillList from './BillList';
import { formatCurrency } from '@/utils/format';

const StatCard = ({ label, value, icon: Icon, type = 'primary' }) => (
    <div className="stat-card">
        <div className="flex justify-between items-start">
            <div>
                <p className="stat-label">{label}</p>
                <p className={`stat-value ${type}`}>{value}</p>
            </div>
            {/* <div className={`p-3 rounded-xl bg-${type}-light/10`}>
                <Icon className={`w-6 h-6 text-${type}-light`} />
            </div> */}
        </div>
        {/* <div className="absolute right-0 bottom-0 opacity-10">
            <Icon className="w-24 h-24 transform translate-x-1/4 translate-y-1/4" />
        </div> */}
    </div>
);

const BillDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const totalAmount = useSelector(selectTotalAmount);
    const monthlyBudget = useSelector(state => state.bills.monthlyBudget);
    const budgetUsage = (totalAmount / monthlyBudget) * 100;

    return (

        <div className="min-h-screen bg-slate-900 px-4 py-8">
            
            <div className="max-w-7xl mx-auto space-y-8">
            
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-5xl font-bold ">
                            Bill Dashboard
                        </h1>
                        
                    </div>
                    
                </div>
                
           
                <BillFilters />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        label="Total Expenses"
                        value={`₹${(totalAmount)}`}
                        //icon={TrendingUp}
                        type="primary"
                    />

                    <StatCard
                        label="Monthly Budget"
                        value={`₹${(monthlyBudget)}`}
                        //icon={Wallet}
                        type="success"
                    />


                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn btn-primary"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Add New Bill
                    </button>
                    
                    {/* <StatCard
                        label="Budget Usage"
                        value={`${budgetUsage.toFixed(1)}%`}
                        icon={BadgeDollarSign}
                        type={budgetUsage > 90 ? 'warning' : 'success'}
                    /> */}
                </div>
                
                <div className="flex flex-row gap-6">
                <BillList />
                <BillChart />
                </div>
                
                

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <BillForm onClose={() => setIsModalOpen(false)} />
                </Modal>
            </div>
        </div>
    );
};

export default BillDashboard;