
interface SchemaScriptProps {
  schema: object | object[];
}

export default function SchemaScript({ schema }: SchemaScriptProps) {
  const schemaArray = Array.isArray(schema) ? schema : [schema];
  
  return (
    <>
      {schemaArray.map((schemaItem, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaItem, null, 0),
          }}
        />
      ))}
    </>
  );
}
