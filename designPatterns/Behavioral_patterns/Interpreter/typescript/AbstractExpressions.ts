// defines all the methods needed to perform the different conversions
export default interface AbstractExpression {
  interpret(context: any): number
}