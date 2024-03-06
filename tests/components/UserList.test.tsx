import { render, screen } from '@testing-library/react'
import UserList from '../../src/components/UserList'
import { User } from "../../src/entities";


describe('UserList', () => {
  it('should contain no users when user array is empty', () => {
    const users: User[] = []
    render(<UserList users={users}/>)
    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  })

  it('should contain user unmarked list when user array is not empty', () => {
    const users: User[] = [{id: 1, name: "Oleh"}, {id: 2, name: "Jane"}]
    render(<UserList users={users}/>)
    expect(screen.getByRole("list")).toBeInTheDocument();
    users.forEach(user => {
      const link = screen.getByRole("link", {name: user.name});
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/users/${user.id}`)

    });
  })
})
