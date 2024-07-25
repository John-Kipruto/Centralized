import MemberItem from "./MemberItem"


const MembersListItems = ({users}) => {
    const categories = ["Name", "Email", "Role", "Status", "Update", "Delete"]
  return (
    <div>
        <div className='member border rounded px-2 py-3 grid items-center grid-cols-6'>
            {
                categories.map(item => (
                    <div className='text-lg font-bold'>{item}</div>
                ))
            }
        </div>
          {
            users.map(user => <MemberItem userItem={user} />)
          }
    </div>
  )
}

export default MembersListItems