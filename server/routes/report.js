const { jsPDF } = require("jspdf"); // will automatically load the node version


async function routes(fastify, options) {
    fastify.get('/getpdf', async(request, reply) => {
        try {
            const doc = new jsPDF();
            await doc.html("hello", {
                callback: function(doc) {
                    doc.save("a45.pdf");
                },
                x: 10,
                y: 10
            });
        } catch (error) {
            reply.send(error)
        }

    })
}

module.exports = routes