export default function establishmentHandler() {
  return [
    200,
    {
      uuid: "123123",
      alert: "stringaaaa",
      description: "string",
      phone: "19995755514",
      installments: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ] as const;
}
