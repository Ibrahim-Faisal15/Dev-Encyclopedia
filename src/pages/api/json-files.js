export async function GET() {
    try {
        // Dynamically import fs and path
        const { default: fs } = await import('fs');
        const { default: path } = await import('path');

        const jsonDirectory = path.join(process.cwd(), 'src/content/terms'); // Adjust the path as necessary
        const files = fs.readdirSync(jsonDirectory);
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        const responseBody = JSON.stringify(jsonFiles.map(file => file.replace('.json', '')));
        return new Response(responseBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Unable to scan directory' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
