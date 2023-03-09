import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

const linkStyle = {
    color: 'white',
    fontWeight: 600,
    textDecoration: 'none',
}

function ReferralList(props) {

    useEffect(() => {

        async function getReferrals() {
            const getAllReferrals = await fetch('/api/v1/referrals')
            const parsedResponse = await getAllReferrals.json()
            console.log(parsedResponse.referrals)
            props.setReferrals(parsedResponse.referrals)
        }
        getReferrals()
    }, [])

    const ReferralButton = ({ link }) => <Button variant='contained' type='primary' > <Link style={linkStyle} to={link}> Link </Link> </Button>

    return (
        <>

            <Typography variant="h5" gutterBottom>
                Referrals List
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell align="right">Referred User</TableCell>
                            <TableCell align="right">Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.referrals.map((row) => (
                            <TableRow
                                key={row.referralLink}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.fromEmail}
                                </TableCell>
                                <TableCell align="right">{row.toEmail}</TableCell>
                                <TableCell align="right"> <ReferralButton link={`/referral/${row.referralLink}`} /> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default ReferralList;