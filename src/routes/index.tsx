import { createFileRoute } from "@tanstack/react-router";
import "../App.css";
import { Button, Checkbox, Form, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import type { CheckboxProps, FormProps } from "antd";

export const Route = createFileRoute("/")({ component: App });

const CheckboxGroup = Checkbox.Group;

function App() {
  const [form] = Form.useForm();
  const [todos, setTodos] = useState<Array<string>>([]);
  const [checkedList, setCheckedList] = useState<Array<number>>([]);

  const checkAll = todos.length > 0 && todos.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < todos.length;

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    setCheckedList([]);
  }, [todos]);

  const onFinish: FormProps["onFinish"] = (values) => {
    setTodos((prev) => [...prev, values.todo]);
    form.resetFields();
  };

  const onChange = (list: Array<number>) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? [...todos.keys()] : []);
  };

  function del(index: number) {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const val = JSON.parse(storedTodos);
      val.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(val));
      setTodos(val);
    }
  }

  return (
    <div className="p-5 flex flex-col items-center bg-purple-200 h-screen gap-4">
      <Form form={form} className="flex gap-2" name="basic" onFinish={onFinish}>
        <Form.Item
          name="todo"
          rules={[{ required: true, message: "Please input your task!" }]}
        >
          <Input placeholder="Add a task..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Space orientation="vertical">
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Check all
        </Checkbox>
        <CheckboxGroup
          value={checkedList}
          onChange={onChange}
          className="flex flex-col bg-white px-2 py-2 rounded min-w-65"
        >
          {todos.map((item, index) => (
            <div key={index} className={`bg-white px-4 py-2 rounded`}>
              <Checkbox value={index}>{item}</Checkbox>
              <DeleteOutlined className="pl-3" onClick={() => del(index)} />
            </div>
          ))}
        </CheckboxGroup>
      </Space>
    </div>
  );
}
