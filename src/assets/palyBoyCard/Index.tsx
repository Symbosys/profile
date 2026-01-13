// import { AdminLayout } from "@/components/admin/AdminLayout";
// import { StatCard } from "@/components/admin/StatCard";
// import { RevenueChart } from "@/components/admin/RevenueChart";
// import { UsersTable } from "@/components/admin/UsersTable";
// import { Users, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

// const stats = [
//   {
//     title: "Total Revenue",
//     value: "$45,231",
//     change: "+20.1% from last month",
//     changeType: "positive" as const,
//     icon: DollarSign,
//   },
//   {
//     title: "Active Users",
//     value: "2,350",
//     change: "+180 new users",
//     changeType: "positive" as const,
//     icon: Users,
//   },
//   {
//     title: "Total Orders",
//     value: "1,247",
//     change: "+12.5% from last week",
//     changeType: "positive" as const,
//     icon: ShoppingCart,
//   },
//   {
//     title: "Growth Rate",
//     value: "15.3%",
//     change: "-2.4% from last month",
//     changeType: "negative" as const,
//     icon: TrendingUp,
//   },
// ];

// const Index = () => {
//   return (
//     <AdminLayout>
//       <div className="space-y-6">
//         {/* Page Header */}
//         <div className="animate-fade-in">
//           <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
//           <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {stats.map((stat, index) => (
//             <div key={stat.title} style={{ animationDelay: `${index * 100}ms` }}>
//               <StatCard {...stat} />
//             </div>
//           ))}
//         </div>

//         {/* Charts */}
//         <RevenueChart />

//         {/* Users Table */}
//         <UsersTable />
//       </div>
//     </AdminLayout>
//   );
// };

// export default Index;
