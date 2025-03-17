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
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState, } from "react";
import HtmlViewer from "@/components/ui/html-viewer";
import { useNavigate } from "react-router-dom";

const baseUrlApi = 'http://localhost:3001/api/get-emails'
const payload = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
        "email": "bosnetfl@gmail.com",
        "subject": "Fwd: Your Netflix temporary access code"
    })
}

export default function Empty() {

    const [emails, setEmails] = useState<{ date: string; html: string; subject: string }[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch(baseUrlApi, payload)
            const data = await response.json()
            setEmails(data.data.emails)
            console.log('emails', emails)
            console.log(data.data.emails)
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);

        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long', // Menampilkan nama hari
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        };

        return date.toLocaleDateString('id-ID', options); // 'id-ID' untuk format Indonesia
    }

    const toDetailPage = (email: { date: string; html: string; subject: string }) => () => {
        navigate('/email/detail', { state: email })
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Dashboard</PageHeaderHeading>
            </PageHeader>
            <Card>
                <CardHeader>
                    <CardTitle>React Shadcn Starter</CardTitle>
                    <CardDescription>React + Vite + TypeScript template for building apps with shadcn/ui.</CardDescription>
                </CardHeader>
            </Card>
            <Table>
                <TableCaption>A list of your recent emails.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No.</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Messages</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">Loading...</TableCell>
                        </TableRow>
                    ) : (
                        emails.map((invoice, index) => (
                            console.log('invoice', invoice.html),
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell className="w-60">{formatDate(invoice.date)}</TableCell>
                                {/* <TableCell><HtmlViewer htmlContent={invoice.html} /></TableCell> */}
                                <TableCell className="flex items-center justify-start gap-2">{invoice.subject} <div className="underline text-blue-500 cursor-pointer" onClick={toDetailPage(invoice)}>(click here for details)</div></TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>

                {/* <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter> */}
            </Table>
        </>
    )
}
