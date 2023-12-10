export default function establishmentHandler() {
  return [
    200,
    {
      uuid: "123123",
      alert:
        "Frete Gratis para compras acima de - 200 reais  Regiao SUDESTE  e 250 DEMAIS regioes!",
      description: "string",
      phone: "5519991824852",
      installments: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ] as const;
}
