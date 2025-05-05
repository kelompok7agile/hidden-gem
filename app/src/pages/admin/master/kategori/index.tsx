import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import IconPicker from '@/components/ui/icon-picker'

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]
const master = 'kategori'
const index = () => {


    const [dialog, setDialog] = useState({
        open: false,
        jenis: "tambah",
        id: null,
    })

    const [form, setForm] = useState({
        id: null,
        name: "",
        icon: "",
    })

    const handleChange = (value: string) => {
        console.log('value', value)
        setForm({ ...form, icon: value })
    }


    return (
        <>
            <div className='text-right'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size='default' className='mb-2 bg-[#ff961b] text-white hover:bg-[#ff961b]/90 hover:text-white'>
                            <Icon icon="ic:baseline-add" width={20} height={20} className='mr-2' />
                            Tambah
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className='capitalize'> {dialog.jenis} {master}</DialogTitle>
                            {/* <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription> */}
                        </DialogHeader>
                        <div>
                            <div className='mb-4'>
                                <Label htmlFor="name" className="text-sm font-medium">Nama</Label>
                                <Input id="name" placeholder={`Masukkan nama ${master}`} className="mt-1" />
                            </div>
                            <div className='mb-4'>
                                <Label htmlFor="icon" className="text-sm font-medium">Icon</Label>
                                <IconPicker
                                    value={form.icon}
                                    onChange={(value) =>
                                       handleChange(value)
                                    }
                                    showSearch={true}
                                    limit={60}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
            <p className='bg-primary rounded-lg text-white px-3 py-2 font-semibold mb-4 capitalize'>Kategori</p>
            <div className='py-2'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                <TableCell>{invoice.paymentStatus}</TableCell>
                                <TableCell>{invoice.paymentMethod}</TableCell>
                                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div >
        </>
    )
}

export default index