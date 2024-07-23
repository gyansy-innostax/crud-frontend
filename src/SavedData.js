import './SavedData.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchedAllData, updateInitial, deleteUsersData } from './features/crudSlice';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useEffect } from 'react';

const SavedData = () => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchedAllData());
    },[])

    const usersData = useSelector(state => state.userData);

    const handleDelete = (user) => {
        dispatch(deleteUsersData(user));
    }

    return (
        <>
            <div className='heading'>
                <h2>Saved Data</h2>
            </div>
            <div className="table">
                <table>
                    <thead className="table-heading">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {usersData.map((user,index) => (
                            <tr key={index}>
                                <td className='table-text'>{user.name}</td>
                                <td className='table-text'>{user.email}</td>
                                <td className='table-text'>{user.phone}</td>
                                <td>
                                    <MdDeleteForever
                                        size="1.6rem"
                                        cursor="pointer"
                                        onClick={() => handleDelete(user)}
                                    />
                                </td>
                                <td>
                                    <FaEdit
                                        size="1.3rem"
                                        cursor="pointer"
                                        onClick={()=> dispatch(updateInitial(user))}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default SavedData;
