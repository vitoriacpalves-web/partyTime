const PartyModel = require("../models/Party");

const ckeckPartyBudget = (budget, services) => {
    const priceSum = services.reduce((sum, service) => sum + service.price, 0);


    if (priceSum > budget) {
        return false;
    }

    return true;

};

const partyController = {

    create: async (req, res) => {
        try {

            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
            };

            //REGRA DE NEGÓCIO, BUGET NÃO PODE SER MENOR QUE O SERVIÇO

            if (party.services && !ckeckPartyBudget(party.budget, party.services)) {
                res.status(406).json({ msg: "Seu orçamento é insuficiente." })
                return;
            }

            const response = await PartyModel.create(party);

            res.status(201).json({ response, msg: "Festa criada com sucesso." })

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro ao criar festa." })
        }
    },

    getAll: async (req, res) => {
        try {
            const parties = await PartyModel.find();

            res.json(parties);

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro ao buscar festas" })
        }
    },

    get: async (req, res) => {
        try {

            const id = req.params.id;

            const party = await PartyModel.findById(id);

            if (!party) {
                res.status(404).json({ msg: "Festa não encontrada" });
                return;
            }

            res.json(party)

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro ao buscar festa." })
        }
    },

    getByTitle: async (req, res) => {
        try {
            const title = req.params.title;
            
            const parties = await PartyModel.find({
                title: { $regex: title, $options: "i" }
                //"i" = case-intensive (não diferencia maiuscula de minusculas)
                //regex faz uma busca "contem", onde não precisa ser o tituloo exato
            })

            res.json(parties)

        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "Erro ao buscar festa." })
        }
    },

    delete: async (req, res) => {
        try {

            const id = req.params.id;

            const party = await PartyModel.findById(id);

            if (!party) {
                res.status(404).json({ msg: "Festa não encontrada" });
                return;
            }

            const deleteService = await PartyModel.findByIdAndDelete(id);

            res.status(200).json({ deleteService, msg: "Festa deletada com sucesso!" });

        } catch (error) {

            console.log(error);
            res.status(500).json({ msg: "Não foi possível deletar a festa." })

        }
    },

    update: async (req, res) => {
        try {

            const id = req.params.id;

            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
            };

            //REGRA DE NEGÓCIO, BUGET NÃO PODE SER MENOR QUE O SERVIÇO

            if (party.services && !ckeckPartyBudget(party.budget, party.services)) {
                res.status(406).json({ msg: "Seu orçamento é insuficiente." })
                return;
            }

            const updateService = await PartyModel.findByIdAndUpdate(id, party);

            if (!updateService) {
                res.status(404).json({ msg: "Festa não encontrada" });
                return;
            }


            res.status(200).json({ party, msg: "Festa atualizada com sucesso!" });

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Não foi possível atualizar festa." })
        }
    }
};

module.exports = partyController;