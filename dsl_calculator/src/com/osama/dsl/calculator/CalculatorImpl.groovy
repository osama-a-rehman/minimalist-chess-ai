package com.osama.dsl.calculator

class CalculatorImpl implements ICalculator{
    @Override
    def sum(a,b) {
        println a+b
        return a+b
    }

    @Override
    def subtract(a,b) {
        println a-b
        return a-b
    }

    @Override
    def multiply(a,b) {
        println a*b
        return a*b
    }

    @Override
    def divide(a,b) {
        println a/b
        return a/b
    }
}
