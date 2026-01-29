import { NextRequest, NextResponse } from 'next/server';

// Mock data for testing - replace with real API call
const MOCK_INSTITUTIONS = [
    {
        "_id": "697aeeba085c6e72eb6122a9",
        "name": "University of Canada",
        "location": "Dhaka, Bangladesh",
        "establishedYear": 1995,
        "website": "https://www.ut.edu",
        "image": "",
        "programs": [
            {
                "name": "Computer Science",
                "intake": "Fall 2024",
                "deadline": "2024-06-30",
                "duration": "4 years",
                "degree": "Bachelor",
                "subjects": ["Programming", "Data Structures", "Algorithms"],
                "_id": "697aeeba085c6e72eb6122aa"
            }
        ],
        "requirements": ["High School Diploma", "IELTS 6.0", "Mathematics Background"],
        "scholarships": [
            {
                "name": "Merit Scholarship",
                "amount": "50% tuition",
                "_id": "697aeeba085c6e72eb6122ab"
            }
        ],
        "facilities": ["Library", "Computer Labs", "Sports Complex", "Student Housing"],
        "createdAt": "2026-01-29T05:23:06.178Z",
        "updatedAt": "2026-01-29T05:23:06.178Z",
        "__v": 0
    },
    {
        "_id": "697aeead085c6e72eb6122a1",
        "name": "University of New York",
        "location": "Dhaka, Bangladesh",
        "establishedYear": 1995,
        "website": "https://www.ut.edu",
        "image": "",
        "programs": [
            {
                "name": "Business Administration",
                "intake": "Fall 2024",
                "deadline": "2024-06-30",
                "duration": "4 years",
                "degree": "Bachelor",
                "subjects": ["Management", "Finance", "Marketing"],
                "_id": "697aeead085c6e72eb6122a2"
            }
        ],
        "requirements": ["High School Diploma", "IELTS 6.5", "Mathematics Background"],
        "scholarships": [
            {
                "name": "Need-based Scholarship",
                "amount": "25% tuition",
                "_id": "697aeead085c6e72eb6122a4"
            }
        ],
        "facilities": ["Library", "Computer Labs", "Sports Complex", "Student Housing"],
        "createdAt": "2026-01-29T05:22:53.790Z",
        "updatedAt": "2026-01-29T05:22:53.790Z",
        "__v": 0
    }
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const name = searchParams.get('name');
        const location = searchParams.get('location');

        let filteredData = MOCK_INSTITUTIONS;

        // Apply filters
        if (name) {
            filteredData = filteredData.filter(inst => 
                inst.name.toLowerCase().includes(name.toLowerCase())
            );
        }
        if (location) {
            filteredData = filteredData.filter(inst => 
                inst.location.toLowerCase().includes(location.toLowerCase())
            );
        }

        // Handle single institution request
        if (id) {
            const institution = filteredData.find(inst => inst._id === id);
            if (!institution) {
                return NextResponse.json(
                    { error: 'Institution not found' },
                    { status: 404 }
                );
            }
            return NextResponse.json({
                success: true,
                data: institution
            });
        }

        // Apply pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedData = filteredData.slice(startIndex, endIndex);

        return NextResponse.json({
            success: true,
            data: paginatedData,
            total: filteredData.length,
            page,
            limit
        });
    } catch (error) {
        console.error('Error fetching institutions:', error);
        return NextResponse.json(
            { error: 'Failed to fetch institutions' },
            { status: 500 }
        );
    }
}
