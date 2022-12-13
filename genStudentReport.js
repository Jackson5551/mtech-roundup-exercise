const fs = require('fs')
const jsonfile = require('jsonfile')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

const path = './master.json'

const data = async () => {
    let data = await jsonfile.readFile(path)
    write_data(data)
}

const write_data = (student_data) => {
    student_data.forEach(student => {
        let credithours = 0
        let fullTime = false
        let tuition = 0
        student.classes.forEach(_class => {
            credithours += _class.credit_hours
        })
        if (credithours >= 12) fullTime = true
        if (credithours >= 12 && credithours <= 18) {
            tuition = 3000
        } else if (credithours > 18) {
            tuition = 3000 + ((credithours - 18) * 250)
        } else {
            tuition = credithours * 250
        }
        const currentStudent = [{
            id: student.studentId,
            first_name: student.first_name,
            last_name: student.last_name,
            status: (fullTime ? 'FT' : 'PT'),
            tuition: tuition,
        }]

        const csvWriter = createCsvWriter({
            path: `data/${student.first_name.toLowerCase()}${student.last_name}Report.csv`,
            header: [
                { id: 'id', title: 'ID' },
                { id: 'first_name', title: 'First Name' },
                { id: 'last_name', title: 'Last Name' },
                { id: 'status', title: 'Status' },
                { id: 'tuition', title: 'Tuition' },
            ]
        })
        csvWriter.writeRecords(currentStudent)

    });
}

data()