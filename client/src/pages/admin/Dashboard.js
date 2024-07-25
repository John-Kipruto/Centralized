import {Bar, Line} from 'react-chartjs-2'
import MembersListItems from '../../components/admin/MembersListItems'
import { useSelector } from 'react-redux'
import { Buffer } from 'buffer'

const Dashboard = () => {
  const user = useSelector(state => state.user)
  const totalUsers = user.users.length
  const activeUsers = user.users.filter(item => item.active === true).length
  const closedAccounts = user.users.filter(item => item.active === false).length
  const stats = [
    { icon: <i class="bi bi-people-fill"></i>, title: "Total Users", totalNumber: totalUsers, rating: 1.34, positiveIncrease: true, color: "blue" },
    { icon: <i class="bi bi-person-fill-check"></i>, title: "Active Users", totalNumber: activeUsers, rating: 2, positiveIncrease: true, color: "purple" },
    { icon: <i class="bi bi-person-lines-fill"></i>, title: "Passive Users", totalNumber: 8, rating: 0.3, positiveIncrease: false, color: "orange" },
    { icon: <i class="bi bi-person-fill-slash"></i>, title: "Closed Accounts", totalNumber: closedAccounts, rating: 0.4, positiveIncrease: true, color: 'red' },
  ]
  const toDos = [
    {title: "Update members database"},
    {title: "Check and verify error logs"},
    {title: "Update members authorities"},
    {title: "Showcase user details to admin"},
    {title: "View recent users activities"},
    {title: "Verify inactive accounts"},
    {title: "Create new records for Db operations"}
  ]


  return (
    <div className='admin-dashboard content-container'>
        <section className='stats-grid-container grid-container'>
          {
            stats.map(stat => (
              <div className={`stat bg-slate-50 shadow rounded`}>
                <div className='icon-stat-info'>
                  <div className='icon' style={{color: stat.color}}>{stat.icon}</div>
                  <div className='info'>
                    <h4 className='font-bold'>{stat.title}</h4>
                    <p className='font-bold text-2xl'>{stat.totalNumber}</p>
                  </div>
                </div>
                <div className='rating font-bold text-xl'>{stat.positiveIncrease ? <div style={{color: "green"}}>+{stat.rating}%</div> : <div style={{color: "red"}}>-{stat.rating}%</div>}</div>
              </div>
            ))
          }

        </section>

        <section className='content-section grid-container grid md:grid-cols-3'>
          
        <div className='chart-container md:col-span-2 shadow round bg-slate-50'>
        <h1 className='text-xl font-bold text-gray-500'>Recent Activities</h1>
            <Bar
              data={{
                labels: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
                datasets: [
                  {
                    label:"Activity Events",
                    data: [1, 3, 5, 4, 6, 5, 9],
                    barThickness: 30,
                    backgroundColor: "blue",
                  },
                ]
              }}
              options = {{
                scales: {
                    x: {
                        grid:{
                            color: 'grey',
                        },
                        border: {
                            dash: [2,4],
                        }
                    },
                    y: {
                        grid: {
                            color: 'gray',
                        },
                        border: {
                            dash: [2,4],
                        }
                   }
                }}
            }
             />
          </div>
          
          <div className='shadow rounded px-10 py-3 bg-slate-50'>
          <h2 className='text-xl font-bold text-gray-500 flex items-center'><span className='text-5xl mr-2 text-orange-700'><i class="bi bi-card-list"></i></span>To-Do List</h2>
          {
            toDos.map(item => (
              <p className='py-3 px-3 border rounded border-sky-900'><span className='text-green-500 mr-2 text-xl'><i class="bi bi-check2-square"></i></span>{item.title}</p>
            ))
          }
        </div>
        </section>
          
        <section className='content-section grid-container grid md:grid-cols-3'>
        <div className='shadow rounded bg-slate-50 px-3 py-3'>
            <h2 className='text-xl font-bold text-gray-500 flex items-center'><span className='text-6xl mr-2 text-green-700'><i class="bi bi-person-check-fill"></i></span>Top Active Members</h2>
            {user.users ? user.users.slice(0, 6).map(user => (
              <div className='member border px-2 py-1 rounded flex items-center justify-between'>
                <div className='flex items-center'>
                  <span className='image-container mr-2 border image-container rounded-image-container text-2xl'>
                  {
                    user.image ?
                    <div><img src={`data:image/png;base64, ${Buffer.from(user.image.data, "binary").toString("base64")}`} alt={user.name} /></div>
                    : 
                    <div> <img src='' alt='' /></div>
                  }
                  </span>
                  <span className='lg'>{user.name}</span> 
                </div>
                <div className='text-green-500 font-bold'>Active</div>
                
              </div>
            )) : <div></div>}
          </div>
          
          <div className='chart-container shadow rounded md:col-span-2 bg-gray-50'>
          <h2 className='text-xl font-bold text-gray-500'>Customer Activity Rate</h2>
              <Line
                data={{
                  labels: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
                  datasets: [
                    {
                      label:"Active Customers",
                      data: [10, 9, 11, 10, 12, 11, 15],
                      borderColor: "green"
                    },

                    {
                      label:"Inactive customers",
                      data: [8, 10, 7, 6, 7, 5, 3],
                      borderColor: "red",
                      borderDash: [10,5]
                    },
                  ]
                }}
                options = {{
                  scales: {
                      x: {
                          grid:{
                              color: 'grey',
                          },
                          border: {
                              dash: [2,4],
                          }
                      },
                      y: {
                          grid: {
                              color: 'gray',
                          },
                          border: {
                              dash: [2,4],
                          }
                     }
                  }}}
              />
          </div>
        </section>
          
        <section className='content-section shadow rounded bg-slate-50 px-3 py-3'>
        <h2 className='text-xl font-bold text-gray-500 flex items-center'><span className='text-6xl mr-2 text-indigo-700'><i class="bi bi-people-fill"></i></span>Members Summary</h2>
          
          {user.loading && <div>Loading users .......</div> }
          {user.users ?  <MembersListItems users={user.users.slice(0, 7)} /> : <div></div>}
         
        </section>
    </div>
  )
}

export default Dashboard