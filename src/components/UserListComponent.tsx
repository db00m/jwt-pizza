import { TrashIcon } from "../icons";
import React, { useEffect, useRef, useState } from "react";
import { User, UserList } from "../service/pizzaService";
import { pizzaService } from "../service/service";


export const UserListComponent = () => {
  const [userList, setUserList] = useState<UserList>({ users: [], more: true });
  const [page, setPage] = useState(0);
  const filterUsersRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      setUserList(await pizzaService.getUsers(page, 10, "*"));
    })();
  }, [page]);

  const filterUsers = async () => {
    setUserList(await pizzaService.getUsers(page, 10, `*${filterUsersRef.current?.value}*`));
  }

  const deleteUser = async (user: User) => {
    pizzaService.deleteUser(user.id!).then(async () => {
      setUserList(await pizzaService.getUsers(page, 10, "*"));
    })
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="uppercase text-neutral-100 bg-slate-400 border-b-2 border-gray-500">
      <tr>
        {['Name', 'Email', 'Role', 'Action'].map((header) => (
          <th key={header} scope="col" className="px-6 py-3 text-center text-xs font-medium">
            {header}
          </th>
        ))}
      </tr>
      </thead>
      {userList.users.map((user, findex) => {
        return (
          <tbody key={findex} className="divide-y divide-gray-200">
          <tr className="border-neutral-500 border-t-2">
            <td className="text-start px-2 whitespace-nowrap text-l font-mono text-orange-600">{user.name}</td>
            <td className="text-start px-2 whitespace-nowrap text-sm font-normal text-gray-800">{user.email}</td>
            <td className="text-start px-2 whitespace-nowrap text-sm font-normal text-gray-800">
              {user.roles?.map(role => role.role).join(", ")}
            </td>
            <td className="px-6 py-1 whitespace-nowrap text-end text-sm font-medium">
              <button type="button" className="px-2 py-1 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-1 border-orange-400 text-orange-400  hover:border-orange-800 hover:text-orange-800" onClick={() => deleteUser(user)}>
                <TrashIcon />
                Delete
              </button>
            </td>
          </tr>
          </tbody>
        );
      })}
      <tfoot>
      <tr>
        <td className="px-1 py-1">
          <input type="text" ref={filterUsersRef} name="filterFranchise" placeholder="Filter franchises" className="px-2 py-1 text-sm border border-gray-300 rounded-lg" />
          <button type="submit" className="ml-2 px-2 py-1 text-sm font-semibold rounded-lg border border-orange-400 text-orange-400 hover:border-orange-800 hover:text-orange-800" onClick={filterUsers}>
            Submit
          </button>
        </td>
        <td colSpan={4} className="text-end text-sm font-medium">
          <button className="w-12 p-1 text-sm font-semibold rounded-lg border border-transparent bg-white text-grey border-grey m-1 hover:bg-orange-200 disabled:bg-neutral-300 " onClick={() => setPage(page - 1)} disabled={page <= 0}>
            «
          </button>
          <button className="w-12 p-1 text-sm font-semibold rounded-lg border border-transparent bg-white text-grey border-grey m-1 hover:bg-orange-200 disabled:bg-neutral-300" onClick={() => setPage(page + 1)} disabled={!userList.more}>
            »
          </button>
        </td>
      </tr>
      </tfoot>
    </table>
  )
}