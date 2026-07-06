import type { FileNode } from '../types/filesystem';

export const initialData: FileNode = {
    type: 'folder',
    name: 'root',
    id: 'root',
    children: [
        {
            type: 'folder',
            name: 'Documents',
            id: 'documents',
            children: [
                {
                    type: 'file',
                    name: 'Resume.pdf',
                    id: 'resume',
                    content: 'This is the content of Resume.pdf'
                },
                {
                    type: 'file',
                    name: 'CoverLetter.docx',
                    id: 'coverLetter',
                    content: 'This is the content of CoverLetter.docx'
                }
            ]
        },
        {
            type: 'folder',
            name: 'Pictures',
            id: 'pictures',
            children: [
                {
                    type: 'file',
                    name: 'Vacation.jpg',
                    id: 'vacation',
                    content: 'This is the content of Vacation.jpg'
                }
            ]
        },
        {
            type: 'file',
            name: 'todo.txt',
            id: 'todo',
            content: 'This is the content of todo.txt'
        }
    ]
}