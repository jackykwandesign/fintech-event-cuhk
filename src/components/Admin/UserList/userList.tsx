import React, { useEffect, useState } from 'react';
import ProTable, { IntlProvider, ProColumns, enUSIntl  } from '@ant-design/pro-table';

import 'antd/dist/antd.css';
import en_US from 'antd/lib/locale/en_US';
import { DBUser, KYCData } from '../../../contexts/firebaseContext/firebaseContext';
import { adminGetAllUser } from '../../../service/admin';

const handleKnowOfConference = (values:KYCData) =>{
        let knowOfConference = ""
        if(values.knowOfConference === "Others"){
            knowOfConference = "Others-" + values.otherKnowOfConference
        }else if(values.knowOfConference === "Supporting Organization"){
            knowOfConference= "Supporting Organization-" + values.supportOrganization
        }else if(values.knowOfConference === "Advertisement"){
            knowOfConference = "Advertisement-" + values.advertisement
        }else{
            knowOfConference = values.knowOfConference
        }
        return knowOfConference
}
const handleInterest = (values:KYCData) =>{
    let interest = ""
    for(let i = 0; i < values.interestCheckbox.length; i++){
      if(values.interestCheckbox[i] === "Others"){
        interest += (interest !== "" ? ", ": "")
        interest += ("Others-" + values.otherInterest + " ")
      }else{
        interest += (interest !== "" ? ", ": "")
        interest += (values.interestCheckbox[i] + " ")
      }
    }
    // if(values.interest === "Others"){
    //     interest = "Others-" + values.otherInterests
    // }else{
    //     interest = values.interest
    // }
    return interest
}

const interestParticipantList:(DBUser[])[] = [[],[],[],[],[]]
const columns: ProColumns<DBUser>[] = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a:DBUser, b:DBUser) => {
            return a.name.localeCompare(b.name);
        }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a:DBUser, b:DBUser) => {
          return a.email.localeCompare(b.email);
      }
    },
    {
      title: 'FinishInfo',
      dataIndex: 'finishInfo',
      render: (text, row, index, action) => {
        return(
          text === true ? "Yes" : "No"
        )
      },
      sorter: (a:DBUser, b:DBUser) => {
          return (a.finishInfo === b.finishInfo)? 0 : a.finishInfo? -1 : 1;
      }
    },
    {
      title: 'Salutation',
      dataIndex: ['kycData','salutation'],
      sorter: (a:DBUser, b:DBUser) => {
        if(!a.finishInfo && !b.finishInfo){
          return 0
        }else if(a.finishInfo === false){
          return 1
        }else if(b.finishInfo === false){
          return -1
        }
        return a.kycData.salutation.localeCompare(b.kycData.salutation);
      }
    },
    {
      title: 'FirstName',
      dataIndex: ['kycData','firstName'],
      sorter: (a:DBUser, b:DBUser) => {
        if(!a.finishInfo && !b.finishInfo){
          return 0
        }else if(a.finishInfo === false){
          return 1
        }else if(b.finishInfo === false){
          return -1
        }
        return a.kycData.firstName.localeCompare(b.kycData.firstName);
      }
    },
    {
      title: 'LastName',
      dataIndex: ['kycData','lastName'],
      sorter: (a:DBUser, b:DBUser) => {
        if(!a.finishInfo && !b.finishInfo){
          return 0
        }else if(a.finishInfo === false){
          return 1
        }else if(b.finishInfo === false){
          return -1
        }
        return a.kycData.lastName.localeCompare(b.kycData.lastName);
      }
    },
    {
      title: 'Organization',
      dataIndex: ['kycData','organization'],
      sorter: (a:DBUser, b:DBUser) => {
        if(!a.finishInfo && !b.finishInfo){
          return 0
        }else if(a.finishInfo === false){
          return 1
        }else if(b.finishInfo === false){
          return -1
        }
        return a.kycData.organization.localeCompare(b.kycData.organization);
      }
    },
    
    {
        title: 'Job Title',
        dataIndex: ['kycData','jobTitle'],
        sorter: (a:DBUser, b:DBUser) => {
          if(!a.finishInfo && !b.finishInfo){
            return 0
          }else if(a.finishInfo === false){
            return 1
          }else if(b.finishInfo === false){
            return -1
          }
          return a.kycData.jobTitle.localeCompare(b.kycData.jobTitle);
        }
    },
    {
        title: 'Organization',
        dataIndex: ['kycData','organization'],
        sorter: (a:DBUser, b:DBUser) => {
          if(!a.finishInfo && !b.finishInfo){
            return 0
          }else if(a.finishInfo === false){
            return 1
          }else if(b.finishInfo === false){
            return -1
          }
          return a.kycData.organization.localeCompare(b.kycData.organization);
        }
    },
    {
      title: 'ContactEmail',
      dataIndex: ['kycData','contactEmail'],
      sorter: (a:DBUser, b:DBUser) => {
        if(!a.finishInfo && !b.finishInfo){
          return 0
        }else if(a.finishInfo === false){
          return 1
        }else if(b.finishInfo === false){
          return -1
        }
        return a.kycData.contactEmail.localeCompare(b.kycData.contactEmail);
      }
    },
    {
      title: 'ContactNumber',
      dataIndex: ['kycData','contactNumber'],
      sorter: (a:DBUser, b:DBUser) => {
        if(!a.finishInfo && !b.finishInfo){
          return 0
        }else if(a.finishInfo === false){
          return 1
        }else if(b.finishInfo === false){
          return -1
        }
        return a.kycData.contactNumber.localeCompare(b.kycData.contactNumber);
      }
    },
    {
      title: 'AreaCode',
      dataIndex: ['kycData','areaCode'],
      sorter: (a:DBUser, b:DBUser) => {
        if(!a.finishInfo && !b.finishInfo){
          return 0
        }else if(a.finishInfo === false){
          return 1
        }else if(b.finishInfo === false){
          return -1
        }
        return a.kycData.areaCode.localeCompare(b.kycData.areaCode);
      }
    },
    {
      title: 'KnowOfConference',
      dataIndex: ['kycData','knowOfConference'],
      render: (text, row, index, action) => {
        console.log("row", row)
        return(
          (row as DBUser).finishInfo ? handleKnowOfConference((row as DBUser).kycData) : "N/A"

        )
      }
    },
    {
      title: 'Interest',
      dataIndex: ['kycData','interest'],
      render: (text, row, index, action) => {
        console.log("row", row)
        return(
          (row as DBUser).finishInfo ? handleInterest((row as DBUser).kycData) : "N/A"

        )
      }
    },
//   { id: 'contactEmail', numeric: false, disablePadding: false, label: 'Contact Email' },
//   { id: 'contactNumber', numeric: false, disablePadding: false, label: 'Contact Number' },
//   { id: 'areaCode', numeric: false, disablePadding: false, label: 'Area Code' },
//   { id: 'knowOfConference', numeric: false, disablePadding: false, label: 'Know Of Conference' },
//   { id: 'interest', numeric: false, disablePadding: false, label: 'Interest' },
    {
        title:"Send Email",
        dataIndex:'email',
        render: (text, row, index, action) => {
            return(
                <a  href={`mailto:${text}`} target="_blank" rel="noopener noreferrer">Send Email</a>
            )
        }
    }
]
const ParticipantDetail = (props:any) =>{
    const [userList, setUserList] = useState<DBUser[]>([])
    
    // const handleChangeInterest = async(index:number) =>{
    //     await setUserList(interestParticipantList[index])
    // }
    const compare = (a:DBUser, b:DBUser) =>{
        return a.name.localeCompare(b.name); 
    }
    const getDataAsync = async() =>{
        const res = await adminGetAllUser()
        res?.sort(compare)
        // res?.map(data=>{
        //   if(data.kycData.firstName===undefined){
        //     console.log("undefined fn", data.name)
        //   }
        // })
        res && setUserList(res)
    }

    useEffect(()=>{
        getDataAsync()
    },[])

    
    return (
        <div >
          <IntlProvider value={{ intl: enUSIntl}}>
              <ProTable<DBUser> 
                  rowKey="key"
                  pagination={{
                      showQuickJumper: true,
                  }}
                  columns={columns}
                  dataSource={userList}
                  dateFormatter="string"
                  search={false}
                  // headerTitle="表格标题"
                  toolBarRender={false}
              />
          </IntlProvider>
        </div>

    )
    // return(

    // )
}
export default ParticipantDetail


// import React, { useEffect, useState } from 'react';
// // import React, { useEffect, useState } from 'react'
// import { DBUser, KYCData } from '../../../contexts/firebaseContext/firebaseContext'
// import { adminGetAllUser } from '../../../service/admin'
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import { lighten, makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
// // import FormControlLabel from '@material-ui/core/FormControlLabel';
// // import Switch from '@material-ui/core/Switch';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';

// function descendingComparator(a:any, b:any, orderBy:string) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order:string, orderBy:string) {
//   return order === 'desc'
//     ? (a: any, b: any) => descendingComparator(a, b, orderBy)
//     : (a: any, b: any) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array:any[], comparator: { (a: any, b: any): number; (arg0: number, arg1: number): any; }) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//   { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
//   { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
//   { id: 'finishInfo', numeric: false, disablePadding: false, label: 'FinishInfo' },
//   { id: 'salutation', numeric: false, disablePadding: false, label: 'Salutation' },
//   { id: 'firstName', numeric: false, disablePadding: false, label: 'First Name' },
//   { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
//   { id: 'organization', numeric: false, disablePadding: false, label: 'Organization' },
//   { id: 'jobTitle', numeric: false, disablePadding: false, label: 'JobTitle' },
//   { id: 'contactEmail', numeric: false, disablePadding: false, label: 'Contact Email' },
//   { id: 'contactNumber', numeric: false, disablePadding: false, label: 'Contact Number' },
//   { id: 'areaCode', numeric: false, disablePadding: false, label: 'Area Code' },
//   { id: 'knowOfConference', numeric: false, disablePadding: false, label: 'Know Of Conference' },
//   { id: 'interest', numeric: false, disablePadding: false, label: 'Interest' },
// ];

// const handleKnowOfConference = (values:KYCData) =>{
//         let knowOfConference = ""
//         if(values.knowOfConference === "Others"){
//             knowOfConference = "Others-" + values.otherKnowOfConference
//         }else if(values.knowOfConference === "Supporting Organization"){
//             knowOfConference= "Supporting Organization-" + values.supportOrganization
//         }else if(values.knowOfConference === "Advertisement"){
//             knowOfConference = "Advertisement-" + values.advertisement
//         }else{
//             knowOfConference = values.knowOfConference
//         }
//         return knowOfConference
// }
// const handleInterest = (values:KYCData) =>{
//     let interest = ""
//     for(let i = 0; i < values.interestCheckbox.length; i++){
//       if(values.interestCheckbox[i] === "Others"){
//         interest += (interest !== "" ? ", ": "")
//         interest += ("Others-" + values.otherInterest + " ")
//       }else{
//         interest += (interest !== "" ? ", ": "")
//         interest += (values.interestCheckbox[i] + " ")
//       }
//     }
//     // if(values.interest === "Others"){
//     //     interest = "Others-" + values.otherInterests
//     // }else{
//     //     interest = values.interest
//     // }
//     return interest
// }
// function EnhancedTableHead(props: { classes: any; onSelectAllClick: any; order: any; orderBy: any; numSelected: any; rowCount: any; onRequestSort: any; }) {
//   const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
//   const createSortHandler = (property: string) => (event: any) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{ 'aria-label': 'select all desserts' }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'default'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <span className={classes.visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </span>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// const useToolbarStyles = makeStyles((theme) => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//   },
//   highlight:
//     theme.palette.type === 'light'
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   title: {
//     flex: '1 1 100%',
//   },
// }));

// const EnhancedTableToolbar = (props: { numSelected: any; }) => {
//   const classes = useToolbarStyles();
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       className={clsx(classes.root, {
//         [classes.highlight]: numSelected > 0,
//       })}
//     >
//       {numSelected > 0 ? (
//         <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
//           Participant List
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton aria-label="delete">
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton aria-label="filter list">
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//   },
//   paper: {
//     width: '100%',
//     marginBottom: theme.spacing(2),
//   },
//   table: {
//     minWidth: 750,
//   },
//   visuallyHidden: {
//     border: 0,
//     clip: 'rect(0 0 0 0)',
//     height: 1,
//     margin: -1,
//     overflow: 'hidden',
//     padding: 0,
//     position: 'absolute',
//     top: 20,
//     width: 1,
//   },
// }));

// export default function UserList() {
//     const classes = useStyles();
//     const [order, setOrder] = React.useState('asc');
//     const [orderBy, setOrderBy] = React.useState('calories');
//     const [selected, setSelected] = React.useState<string[]>([]);
//     const [page, setPage] = React.useState(0);
//     // const [dense, setDense] = React.useState(true);
//     const dense = true
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);

//     const [userList, serUserList] = useState<DBUser[]| undefined>(undefined)
//     useEffect(()=>{
//         async function getAllUser(){
//             const res = await adminGetAllUser()
//             console.log("res",res)
//             serUserList(res)
//         }
//         getAllUser()
//     },[])

//   const handleRequestSort = (_event: any, property: React.SetStateAction<string>) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event: { target: { checked: any; }; }) => {
//     if (event.target.checked) {
//       const newSelecteds = userList?.map((n) => n.name);
//       setSelected(newSelecteds ? newSelecteds : []);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (_event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, name: string) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected: any[] | ((prevState: string[]) => string[]) = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (_event: any, newPage: React.SetStateAction<number>) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

// //   const handleChangeDense = (event: { target: { checked: React.SetStateAction<boolean>; }; }) => {
// //     setDense(event.target.checked);
// //   };

//   const isSelected = (name: string) => selected.indexOf(name) !== -1;

//   const emptyRows = rowsPerPage - Math.min(rowsPerPage, (userList ? userList.length : 0) - page * rowsPerPage);

//   return (
//     <div className={classes.root}>
//       <Paper className={classes.paper}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <TableContainer>
//           <Table
//             className={classes.table}
//             aria-labelledby="tableTitle"
//             size={dense ? 'small' : 'medium'}
//             aria-label="enhanced table"
//           >
//             <EnhancedTableHead
//               classes={classes}
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={userList ? userList?.length : 0}
//             />
//             <TableBody>
//               {stableSort(userList ? userList : [], getComparator(order, orderBy))
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => {
//                   const isItemSelected = isSelected(row.name);
//                   const labelId = `enhanced-table-checkbox-${index}`;

//                   return (
//                     <TableRow
//                       hover
//                       onClick={(event) => handleClick(event, row.name)}
//                       role="checkbox"
//                       aria-checked={isItemSelected}
//                       tabIndex={-1}
//                       key={row.name}
//                       selected={isItemSelected}
//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           checked={isItemSelected}
//                           inputProps={{ 'aria-labelledby': labelId }}
//                         />
//                       </TableCell>
//                       <TableCell component="th" id={labelId} scope="row" padding="none">
//                         {row.name}
//                       </TableCell>
//                       <TableCell align="left">{row.email}</TableCell>
//                       <TableCell align="left">{row.finishInfo ? "Yes" : "No"}</TableCell>
//                       <TableCell align="left">{row.finishInfo && row.kycData.salutation}</TableCell>
//                       <TableCell align="left">{row.finishInfo && row.kycData.firstName}</TableCell>
//                       <TableCell align="left">{row.finishInfo && row.kycData.lastName}</TableCell>
//                       <TableCell align="left">{row.finishInfo && row.kycData.organization}</TableCell>
//                       <TableCell align="left">{row.finishInfo && row.kycData.jobTitle}</TableCell>
//                       <TableCell align="left">{row.finishInfo && row.kycData.contactEmail}</TableCell>
//                       <TableCell align="left">{row.finishInfo && (row.kycData.contactNumber ? row.kycData.contactNumber : "Not Provided")}</TableCell>
//                       <TableCell align="left">{row.finishInfo && (row.kycData.areaCode ? row.kycData.areaCode : "Not Provided")}</TableCell>
//                       <TableCell align="left">{row.finishInfo && handleKnowOfConference(row.kycData)}</TableCell>
//                       <TableCell align="left">{row.finishInfo && handleInterest(row.kycData)}</TableCell>
//                     </TableRow>
//                   );
//                 })}
//               {emptyRows > 0 && (
//                 <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={userList ? userList.length : 0}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onChangePage={handleChangePage}
//           onChangeRowsPerPage={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </div>
//   );
// }
