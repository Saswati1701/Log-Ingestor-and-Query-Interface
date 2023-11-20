const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {        
          "level": {
            "type": "string",
            // "enum": ["info", "warning", "error", "debug"]
          },
          "message": {
            "type": "string"
          },
          "resourceId": {
            "type": "string"
          },
          "timestamp": {
            "type": "string",
            "format": "date-time"
          },
          "traceId": {
            "type": "string"
          },
          "spanId": {
            "type": "string"
          },
          "commit": {
            "type": "string"
          },
          "metadata": {
            "type": "object",
            "properties": {
              "parentResourceId": {
                "type": "string"
              }
            },
            "required": ["parentResourceId"]
          }
        },
    
    
)
  
const Product = mongoose.model('Product', productSchema)

module.exports = Product;